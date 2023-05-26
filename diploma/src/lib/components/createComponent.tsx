import { Child, Options } from "./types"
import { jsx } from "@jsx"
import { Observable } from "rxjs"

export const createComponent = <T extends keyof HTMLElementTagNameMap>(
  tag:  T, 
  options: Options<T>, 
  children: Child[]
) => {
  const resultNode = document.createElement(tag)  
  
  children.forEach((child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      child = jsx('p', null, child)
    }

    if (child instanceof Observable) {
      let reactiveComponents: Node[] = []
      child.subscribe(value => {
        reactiveComponents.forEach(node => resultNode.contains(node) && resultNode.removeChild(node))
        reactiveComponents = Array.isArray(value) ? value : [value]
        reactiveComponents.forEach((component, componentIndex) => {
          resultNode.insertBefore(component, resultNode.childNodes[index + componentIndex])
        })
      })
    }
    
    if (!(child instanceof Node)) return
    
    resultNode.insertBefore(child, resultNode.childNodes[index])
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