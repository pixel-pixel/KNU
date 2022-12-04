import { Reactive } from "../utils/types";

const p = ({ }, child: Reactive) => {
  const textNode = document.createTextNode(child + '')
  const res = document.createElement('p')
  res.appendChild(textNode);

  child.subscribe(v => textNode.nodeValue = String(v))

  return res
}

export {
  p,
}