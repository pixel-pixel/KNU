import { Primitive, ReactiveFields } from "../utils/types"

type InputAttributes = ReactiveFields<{
  type: string
  value: Primitive
  onchange: (ev: any) => void
}>

const input = (attrs: InputAttributes) => {
  const res = document.createElement('input')

  for (const key in attrs) {
    // @ts-ignore: Unreachable code error
    if ('subscribe' in attrs[key]) {
      // @ts-ignore: Unreachable code error
      attrs[key].subscribe(v => res[key] = v)
    } else {
      // @ts-ignore: Unreachable code error
      res[key] = attrs[key]
    }
  }

  return res
}

export {
  input,
  InputAttributes,
}