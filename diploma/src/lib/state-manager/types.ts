import { Reactive } from "@reactive";

export type LocalStateManager = <T>(value: T) => Reactive<T>

export type GlobalStateManager = <T>(id: string, newValue?: T) => Reactive<T>

export type StateManager = LocalStateManager & {
  global: GlobalStateManager
}