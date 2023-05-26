import { FC } from "@common";
import { pathname } from "./pathname";

type LinkProps = {
  to: string
  class?: string
}

export const Link: FC<LinkProps> = ({
  to,
  class: className
}, children) => {
  const onClick = () => {    
    pathname.next(to)
  }
  return <a class={className} onclick={onClick}>{children![0]}</a>
}