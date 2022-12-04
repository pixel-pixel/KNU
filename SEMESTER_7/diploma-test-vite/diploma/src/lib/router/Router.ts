import { when } from "../operators/when"
import { pathname } from "./pathname"

type FC<I = {}> = (props: I, ...childs: Node[]) => Node

type RouterInput = {
  [path: string]: () => Node
}

export const Router: FC<RouterInput> = (props) => {
  const fNs = Object.entries(props)
  return when(pathname, fNs)
}