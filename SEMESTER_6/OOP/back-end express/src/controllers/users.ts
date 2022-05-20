import { controller } from "../common/utils";
import userModel from "../models/User";

const users = controller({
  async getAll(req, res) {
    const users = await userModel.find()
    res.status(200).json({ users })
  }
})

export default users