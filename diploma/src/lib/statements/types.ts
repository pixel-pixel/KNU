import { FC } from "@common"
import { Observable } from "rxjs"

export type IfProps<T = any> = {
  value: Observable<T>
  is: T
  draw: FC<undefined>
}

export type WhenProps<T = any> = {
  values: Observable<T>[]
  satisfy: (...values: T[]) => boolean
  draw: FC<undefined>
}
