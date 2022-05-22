type Data = {
  [id: string]: DataProps
}

type DataProps = {
  status: Status
  data?: any
}

type Status = 'find' | 'origin'

const userStatuses: Data = {}

export {
  userStatuses
}