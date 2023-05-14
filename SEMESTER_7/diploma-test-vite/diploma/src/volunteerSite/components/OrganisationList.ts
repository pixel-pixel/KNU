import { Div } from "../../lib"
import { FC } from "../../lib/types"
import { Organisation, OrgapisationProps } from "./Organisation"

type OrganisationListProps = {
  orgs: OrgapisationProps[]
}

export const OrganisationList: FC<OrganisationListProps> = ({ 
  orgs
}) => {
  let nodes: Node[]
  orgs.subscribe(() => nodes = orgs.value.map(o => Organisation(o)))

  return Div({},
  )
}