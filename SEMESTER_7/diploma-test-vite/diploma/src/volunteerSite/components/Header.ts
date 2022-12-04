import { Div } from "../../lib";
import { FC } from "../../lib/types";

const style: any = `
  background-color: gray;
  margin: 0;
  padding: 0;
`

export const Header: FC = () => {
  return Div({ style },
    'My cool site',
  )
}