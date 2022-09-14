export class HttpError extends Error {
  name = 'HttpError'
  constructor(public status: number, body: any) {
    super(body)
  }
}