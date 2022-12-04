import { get } from "../utils/controller";

get('/', async (req, res) => {
  res.send('Hello world: Service works!')
})