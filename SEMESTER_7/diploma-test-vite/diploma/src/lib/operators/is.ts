import { Div } from "../components/common";
import { Reactive } from "../utils/reactive";
import { IfFunc } from "./types";

export const is = <T>(
  value: Reactive<T>, 
  func: IfFunc<T>, 
  node: Node
) => {
  const temp = Div({})

  let parrentNode: Node
  let parrentIndex = 0
  let prevFuncRes: boolean

  value.subscribe(async () => {
    await true
    if (!parrentNode) {
      parrentNode = temp.parentNode!
      parrentNode.childNodes.forEach((n, i) => n === temp && (parrentIndex = i))
      
      parrentNode.removeChild(temp)
    }
    
    const funcRes = func(value.value)
    if (funcRes === prevFuncRes) return
    prevFuncRes = funcRes

    if (funcRes) {
      if (parrentIndex > parrentNode.childNodes.length) parrentNode.appendChild(node)
      else parrentNode.insertBefore(node, parrentNode.childNodes[parrentIndex])
      
    } else if (parrentNode.contains(node)) {
      parrentNode.removeChild(node)
    }
  })

  return temp
}
