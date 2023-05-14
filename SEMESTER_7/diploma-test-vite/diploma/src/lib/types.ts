import { Reactive } from "./utils/reactive"

export type ReactiveFields<T extends {}> = {
  [key in keyof T]: T[key] extends Function 
   ? T[key]
   : Reactive<T[key]>
}

export type FC<T extends {} = {}> = (props: ReactiveFields<T>, ...child: Node[]) => Node
