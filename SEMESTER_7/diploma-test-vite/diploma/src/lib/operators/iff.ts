import { Div } from "../components/common";
import { Reactive } from "../utils/reactive";
import { IfFunc, Late } from "./types";

export const iff = <T>(
  value: Reactive<T>, 
  func: IfFunc<T>, 
  lateNode: Late<Node>
) => {
  const container = Div({})
  let prevFuncRes: boolean
  let node: Node

  value.subscribe(() => {
    const funcRes = func(value.value)

    if (funcRes === prevFuncRes) return
    prevFuncRes = funcRes

    if (funcRes) {
      if (!node) node = lateNode()
      container.appendChild(node)
    } else if (container.contains(node)) {
      container.removeChild(node)
    }
  })

  return container
}
