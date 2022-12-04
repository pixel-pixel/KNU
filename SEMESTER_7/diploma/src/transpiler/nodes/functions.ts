import { JsNode } from "./BartNode";
import { Data, Func, Line } from "./shared";

class FuncName implements JsNode {
  constructor(
    public name: string
  ) { }

  toString() {
    return this.name
  }
}

class Lambda implements JsNode {
  constructor(
    public lines: Line[]
  ) { }

  toString() {
    const stringLines: string = this.lines.map(l => l.toString()).join(';')
    return `() => {${stringLines}}`
  }
}

class FuncDecl implements JsNode {
  constructor(
    public name: FuncName,
    public lines: Line[]
  ) { }

  toString() {
    const stringName = this.name.toString()
    const stringLines: string = this.lines.map(l => l.toString()).join(';')
    return `function ${stringName}(){${stringLines}}`
  }
}

class FuncCall implements JsNode {
  constructor(
    public name: Func,
    public args: Data[]
  ) { }

  toString() {
    const stringArgs: string = this.args.map(a => a.toString()).join(',')
    return `${this.name}(${stringArgs})`
  }
}

class GetFuncFrom implements JsNode {
  constructor(
    public data: Data,
    public name: FuncName
  ) { }

  toString() {
    const stringData = this.data.toString()
    const stringName = this.name.toString()
    return `${stringData}.${stringName}`
  }
}

export {
  FuncName,
  Lambda,
  FuncDecl,
  FuncCall,
  GetFuncFrom,
}