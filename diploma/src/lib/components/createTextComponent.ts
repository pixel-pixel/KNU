import { Observable } from "rxjs";
import { Child, Options } from "./types";

const preparedString = <T>(children: Array<Observable<T> | T>) => {
  return children.filter(child => !(child instanceof Observable)).map(String).join('')
}

export const createTextComponent = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  options: Options<T>,
  children: Child[]
) => {
  const textNode = document.createTextNode(preparedString(children))
  const resultNode = document.createElement(tag)  
  resultNode.appendChild(textNode);

  children.forEach((child, index) => {
    if (child instanceof Observable) {
      child.subscribe(value => {
        children[index] = value
        textNode.nodeValue = preparedString(children)
      })
    }
  })

  for (const key in options) {    
    // @ts-ignore: Unreachable code error
    if (options[key] instanceof Observable) {
      // @ts-ignore: Unreachable code error
      options[key].subscribe(() => resultNode[key] = options[key].value)
    } else {
      // @ts-ignore: Unreachable code error
      resultNode[key] = options[key]      
    }
  }

  return resultNode
}