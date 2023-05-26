import { Reactive } from "../reactive/Reactive"
import { GlobalStateManager, LocalStateManager, StateManager } from "./types"
import { BehaviorSubject, Observable } from "rxjs"

const localStateStorage: Observable<any>[] = []
const globalStateStorage: Record<string, Observable<any>> = {}

const local: LocalStateManager = (value) => {
  const id = localStateStorage.length
  setValue(id, value, localStateStorage)
  return getValue(id, localStateStorage)
}

const global: GlobalStateManager = (id, newValue) => {
  if (newValue) {
    setValue(id, newValue, globalStateStorage)
  }
  return getValue(id, globalStateStorage)
}

const getValue = (id: string | number, storage: any) => {
  console.log(`Reading ${id} value from $`);
  
  if (!storage[id]) throw `Property '${id}' does not exist in stage manager`
  return storage[id]
}

const setValue = <T>(id: string | number, value: T, storage: any) => {
  console.log(`Writing ${id} with value ${value} to $`);

  const nonReactiveValue = value instanceof BehaviorSubject
    ? value.getValue()
    : value

  if (!storage[id]) {
    storage[id] = new Reactive(nonReactiveValue)
  } else {
    storage[id].value = nonReactiveValue
  }

  return storage[id]
}

export const $ = local as StateManager
$.global = global