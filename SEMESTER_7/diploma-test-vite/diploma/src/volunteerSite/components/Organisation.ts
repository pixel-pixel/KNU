import { Div, H1, H3, P } from "../../lib";
import { FC } from "../../lib/types";

export type OrgapisationProps = {
  title: string
  description: string
  views: number
  hours: number
  workType: string
  tasks: string[]
  contactEmail: string
  salary: string
}

export const Organisation: FC<OrgapisationProps> = ({
  title, description, views, hours, workType, tasks, contactEmail, salary
}, ...tags) => {
  
  return Div({},
    H3({}, title),
    ...tags,
    P({}, 'Description: ', description),
    P({}, workType),
    P({}, 'Tasks: ',  tasks), 
    P({}, 'Hours: ', hours),
    P({}, 'Salary: ', salary),
    P({}, contactEmail),
    P({}, views)
  )
}