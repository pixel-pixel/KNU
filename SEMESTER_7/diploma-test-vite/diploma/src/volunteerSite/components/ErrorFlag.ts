import { Div, P } from "../../lib";
import { FC } from "../../lib/types";

const style: any = `
  background-color: red;
  color: while;
`

type ErrorFlagInput = {
  error: string
}
export const ErrorFlag: FC<ErrorFlagInput> = ({ error }) => {
  return Div({ style },
    P({}, error)
  )
}