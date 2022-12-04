import { Div } from "../components/common"
import { $, Reactive } from "../utils/reactive"
import { Late } from "./types"

export const when = <T>(
  value: Reactive<T>, 
  fNs: [T, Late<Node>][]
) => {
  const temp = Div({})
  let prevFNsIndex: number
  const nodes: Node[] = []

  let father: Node
  let fatherIndex = 0

  value.subscribe(async () => {
    await true;
    if (!father) {
      father = temp.parentNode!
      father.childNodes.forEach((n, i) => n === temp && (fatherIndex = i))
      console.log({ fatherIndex });
      
      father.removeChild(temp)
    }

    const index = fNs.findIndex(([v]) => v === value.value)

    if (index === prevFNsIndex) return
    prevFNsIndex = index

    nodes.forEach(n => father.contains(n) && father.removeChild(n))

    if (!nodes[index]) nodes[index] = fNs[index][1]()

    const node = nodes[index]
    if (fatherIndex > father.childNodes.length) father.appendChild(node)
    else father.insertBefore(node, father.childNodes[fatherIndex])
  })

  return temp
}