import { P } from "../components/common"
import { Reactive } from "./reactive"
import { StdAdditionalFC, StdFC } from "./types"

const createStdComponent = 
  <T extends keyof HTMLElementTagNameMap>(tag: T, fc?: StdAdditionalFC<HTMLElementTagNameMap[T]>): StdFC<HTMLElementTagNameMap[T]> => {
  return (options, ...childs) => {
    const res = document.createElement(tag)

    childs.forEach(c => {
      if (typeof c === 'string' || typeof c === 'number') {
        c = P({}, c)
      }
      res.appendChild(c)
    })

    for (const key in options) {
      // @ts-ignore: Unreachable code error
      if (options[key] instanceof Reactive) {
        // @ts-ignore: Unreachable code error
        options[key].subscribe(() => res[key] = options[key].value)
      } else {
        // @ts-ignore: Unreachable code error
        res[key] = options[key]
      }
    }

    fc && fc(res, options, ...childs)

    return res
  }
}

export {
  createStdComponent,
}