import { JsNode } from "./BartNode"
import { Data, Line } from "./shared"
import { VarName } from "./variables"

class Program implements JsNode {
  constructor(
    public lines: Line[]
  ) { }

  toString() {
    const stringLines = this.lines.map(l => l.toString()).join(';')
    return stringLines
  }
}

class Operation implements JsNode {
  constructor(
    public opearation: string,
    public a: Data,
    public b: Data,
  ) { }

  toString() {
    let stringA: string = this.a.toString() 
    if (this.a instanceof VarName) stringA += '.value'
    let stringB: string = this.b.toString()
    if (this.b instanceof VarName) stringB += '.value'
    return `${stringA} ${this.opearation} ${stringB}`
  }
}

class Return implements JsNode {
  constructor(
    public data: Data
  ) { }

  toString() {
    const stringData = this.data.toString()
    return `return ${stringData}`
  }
}

export { 
  Program,
  Operation,
  Return,
}