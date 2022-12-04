import { BartNode } from "./BartNode";
import { Operation } from "./others";
import { Data } from "./shared";

class VarName implements BartNode {
  constructor(
    public name: string
  ) { }

  toString() {
    return this.name
  }
}

class VarDecl implements BartNode {
  constructor(
    public name: VarName,
    public data: Data,
  ) { }

  toString() {
    const deps = this.data instanceof Operation
      ? this.data.getDeps().join(',')
      : ''

    const stringData = this.data.toString();
    return `const ${this.name} = $(() => ${stringData}, [${deps}])`
  }
}

class SetVar implements BartNode {
  constructor(
    public name: VarName,
    public data: Data
  ) { }

  toString() {
    const deps = this.data instanceof Operation
      ? this.data.getDeps().join(',')
      : ''

    const stringData = this.data.toString();
    return `${this.name}.set(() => ${stringData}, [${deps}])` 
  }
}

export {
  VarName,
  VarDecl,
  SetVar,
}