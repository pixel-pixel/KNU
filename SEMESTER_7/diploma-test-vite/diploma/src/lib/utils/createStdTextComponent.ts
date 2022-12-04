import { Reactive } from "./reactive";

export const createStdTextComponent = <T extends keyof HTMLElementTagNameMap, K>(tag: T) =>
({ }, child: Reactive<K> | K) => {
  const textNode = document.createTextNode(child + '')
  const res = document.createElement(tag)
  res.appendChild(textNode);

  if (typeof child === 'object' && 'subscribe' in child!) {
    child.subscribe(() => textNode.nodeValue = String(child.value))
  } else {
    textNode.nodeValue = String(child)
  }

  return res
}