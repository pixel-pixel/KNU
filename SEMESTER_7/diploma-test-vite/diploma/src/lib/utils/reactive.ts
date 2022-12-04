import { Change } from "./types"

class Reactive<T = any> {
  #changes: Change[] = []
  #variable: T
  #onSet: (v: T) => void

  #trigger() {
    this.#changes.forEach(c => c())
  }

  constructor(variable: T, onSet: (v: T) => void = () => {}) {
    this.#variable = variable
    this.#onSet = onSet
  }

  subscribe(change: Change) {
    change()
    this.#changes.push(change)
  }

  get value() {
    return this.#variable
  }

  set value(variable: T) {
    this.#onSet(variable)
    this.#variable = variable
    this.#trigger()
  }
}

const $ = <T>(variable: T, onSet: (v: T) => void = () => {}) => new Reactive(variable, onSet)

export {
  Reactive,
  $
}