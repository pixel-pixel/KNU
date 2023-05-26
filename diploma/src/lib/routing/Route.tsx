import { FC } from "@common";
import { RouteProps } from "./types";
import { $if } from "@statements";
import { pathname } from "./pathname";

export const Route: FC<RouteProps> = ({
  path,
  to
}) => {
  return <$if value={pathname} is={path} draw={to} />
}