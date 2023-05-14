import { Reactive } from "./reactive"

export type Primitive =
  | boolean
  | number
  | string

export type Change = () => any

export type ReactiveFields<T> = {
  [key in keyof T]: Reactive<T[key]> | T[key]
}

export type StdFC<I extends HTMLElement> = (options: Partial<ReactiveFields<I>>, ...childs: (Node | string | number)[]) => HTMLElement
export type StdAdditionalFC<I extends HTMLElement> = (el: HTMLElement, options: Partial<ReactiveFields<I>>, ...childs: (Node | string | number)[]) => void