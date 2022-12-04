type Reactive<T extends Primitive = Primitive> = {
  subscribe(func: Change<T>): void
  value: T
}

type Primitive =
  | boolean
  | number
  | string

type Change<T> = (value: T) => any

type ReactiveFields<T> = {
  [key in keyof T]: T[key] extends Primitive
  ? Reactive<T[key]>
  : T[key]
}

export {
  Reactive,
  Primitive,
  Change,
  ReactiveFields,
}