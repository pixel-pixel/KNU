import { H1 } from "../lib"
import { Div } from "../lib"

export const Main = () => {
  return Div({}, 
    H1({}, 'Hello world')
  )
}