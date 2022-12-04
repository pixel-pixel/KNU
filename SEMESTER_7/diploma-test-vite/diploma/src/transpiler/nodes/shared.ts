import { FuncCall, FuncDecl, FuncName, GetFuncFrom, Lambda } from "./functions"
import { ObjLitheral, StringLitheral } from "./litherals"
import { Operation, Return } from "./others"
import { SetVar, VarDecl, VarName } from "./variables"

type Line =
  | FuncDecl
  | VarDecl
  | FuncCall
  | Return
  | SetVar

type Data =
  | FuncName
  | VarName
  | FuncCall
  | ObjLitheral
  | Lambda
  | Operation
  | Number
  | StringLitheral

type Func = 
  | FuncName
  | Lambda
  | GetFuncFrom

export {
  Line,
  Data,
  Func,
}