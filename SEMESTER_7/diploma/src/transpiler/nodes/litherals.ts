import { JsNode } from "./BartNode"
import { Data } from "./shared"
import { VarName } from "./variables"

class ObjLitheral implements JsNode {
  constructor(
    public fields: [VarName, Data][]
  ) { }

  toString() {
    const stringFields: string = this.fields
      .map(([ name, data ]) => `${name.toString()}:${data.toString()}`).join(',')
    return `{${stringFields}}`
  }
}

class StringLitheral implements JsNode {
  constructor(
    public data: string
  ) { }

  toString() {
    return `"${this.data}"`
  }
}

export {
  ObjLitheral,
  StringLitheral,
}