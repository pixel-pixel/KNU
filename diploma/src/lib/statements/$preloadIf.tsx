import { FC } from "@common"
import { IfProps } from "./types"
import { $if } from "./$if"

export const $preloadIf: FC<IfProps> = ({
  value,
  is,
  draw
}) => {
  const drawn = draw(undefined)
  const preloadDraw = () => drawn
  return <$if value={value} is={is} draw={preloadDraw}/>
}