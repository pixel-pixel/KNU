import { JsNode } from "./BartNode";
import { Data } from "./shared";

class VarName implements JsNode {
  constructor(
    public name: string
  ) { }

  toString() {
    return this.name
  }
}

class VarDecl implements JsNode {
  constructor(
    public name: VarName,
    public data: Data,
  ) { }

  toString() {
    const stringData = this.data.toString();
    return `const ${this.name} = $(${stringData})`
  }
}

class SetVar implements JsNode {
  constructor(
    public name: VarName,
    public data: Data
  ) { }

  toString() {
    const stringData = this.data.toString();
    return `${this.name}.value = ${stringData}` 
  }
}

export {
  VarName,
  VarDecl,
  SetVar,
}