import { Change, Primitive, Reactive } from "./types"

function reactive(primitive: boolean): Reactive<boolean>
function reactive(primitive: number): Reactive<number>
function reactive(primitive: string): Reactive<string>

function reactive<T extends Primitive>(primitive: T): Reactive<T> {
  const changes: Change<T>[] = []

  return {
    subscribe(f: Change<T>) {
      f(primitive)
      changes.push(f)
    },

    get value() {
      return primitive
    },

    set value(v) {
      changes.forEach(f => f(v))
      primitive = v
    }
  }
}

export {
  reactive, reactive as $
}