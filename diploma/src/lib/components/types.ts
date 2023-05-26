import { Reactive } from "@reactive"

export type Primitive =
  | boolean
  | number
  | string

export type Change = () => any

export type ReactiveFields<T> = {
  [key in keyof T]: Reactive<T[key]> | T[key]
}

export type Options<T extends keyof HTMLElementTagNameMap> = Partial<ReactiveFields<HTMLElementTagNameMap[T]>>
export type Child = Node | string | number | Reactive