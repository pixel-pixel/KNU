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

  let parrentNode: Node
  let parrentIndex = 0

  value.subscribe(async () => {
    await true
    if (!parrentNode) {
      parrentNode = temp.parentNode!
      parrentNode.childNodes.forEach((n, i) => {
        if (n === temp) parrentIndex = i
      })
      
      parrentNode.removeChild(temp)
    }

    const index = fNs.findIndex(([v]) => v === value.value)

    if (index === prevFNsIndex) return
    prevFNsIndex = index

    nodes.forEach(n => parrentNode.contains(n) && parrentNode.removeChild(n))

    if (!nodes[index]) nodes[index] = fNs[index][1]()

    const node = nodes[index]
    if (parrentIndex > parrentNode.childNodes.length) parrentNode.appendChild(node)
    else parrentNode.insertBefore(node, parrentNode.childNodes[parrentIndex])
  })

  return temp
}