import { BartNode } from "./BartNode"
import { Data, Line } from "./shared"
import { VarName } from "./variables"

class Program implements BartNode {
  constructor(
    public lines: Line[]
  ) { }

  toString() {
    const stringLines = this.lines.map(l => l.toString()).join(';')
    return stringLines
  }
}

class Operation implements BartNode {
  constructor(
    public opearation: string,
    public a: Data,
    public b: Data,
  ) { }

  toString() {
    let stringA: string = this.a.toString() 
    if (this.a instanceof VarName) stringA += '.get()'
    let stringB: string = this.b.toString()
    if (this.b instanceof VarName) stringB += '.get()'
    return `${stringA} ${this.opearation} ${stringB}`
  }

  getDeps(): string[] {
    let depsA = []
    if (this.a instanceof VarName) depsA.push(this.a.name)
    if (this.a instanceof Operation) depsA = depsA.concat(this.a.getDeps())

    let depsB = []
    if (this.b instanceof VarName) depsB.push(this.b.name)
    if (this.b instanceof Operation) depsB = depsB.concat(this.b.getDeps())

    return depsA.concat(depsB)
  }
}

class Return implements BartNode {
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