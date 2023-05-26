import { FC } from "@common"
import { IfProps } from "./types"
import { $when } from "./$when"

export const $if: FC<IfProps> = ({
  value,
  is,
  draw
}) => {
  return <$when values={[value]} satisfy={v => v == is} draw={draw}/>
}