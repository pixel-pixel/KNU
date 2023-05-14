import { Reactive } from "../utils/reactive"

const storage: Record<string, Reactive> = {}

export const addValueToStorage = <T>(id: string, value: T) => {
  storage[id] = new Reactive(value)
}

export const getValueFromStorage = (id: string) => {
  return storage[id]
}