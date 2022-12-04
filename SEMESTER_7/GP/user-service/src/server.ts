import express, { json } from 'express'

const app = express()
const port = process.env.PORT!

app
  .use(json())
  .disable('x-powered-by')

app.listen(port, async () => {
  console.log(`Server started http://localhost:${port}`);
})

export { app }
