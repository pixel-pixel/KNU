import { Reactive } from "./reactive";

export const createStdTextComponent = <T extends keyof HTMLElementTagNameMap, K>(tag: T) =>
({ }, ...child: (Reactive<K> | K)[]) => {
  const textNode = document.createTextNode(child + '')
  const res = document.createElement(tag)
  res.appendChild(textNode);

  const subFunc = () => {
    textNode.nodeValue = child.reduce((acc, cur) => {
      const curText = cur instanceof Reactive
        ? String(cur.value)
        : cur
      return acc + curText
    }, '')
  }

  child.forEach(c => {
    if (c instanceof Reactive) c.subscribe(subFunc)
  })

  return res
}