import { BehaviorSubject, map } from 'rxjs'

export class Reactive<T = any> extends BehaviorSubject<T> {
  $<K>(mapFunc: (value: T) => K) {
    return this.pipe(map(mapFunc))
  }
}