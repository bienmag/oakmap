import { Db, ObjectId } from "mongodb"
import { DBUser } from "../lib/mongo"

class User {
  constructor(
    public _id: object,
    public userId: string,
    public email: string,
    public tokens: Array<string>,
    public trees?: Array<object>,

  ) { }

  static async create(
    _id: object,
    userId: string,
    email: string,
    accessToken: string,

  ): Promise<User> {

    const tokens = []
    const trees: never[] = []
    tokens.push(accessToken)
    let user = await DBUser.updateOne({
      userId: userId
    }, { $set: { _id: _id, userId: userId, email: email, tokens: tokens, trees: trees } }, { upsert: true })

    return new User(_id, userId, email, tokens, trees)
  }


  static async update(
    user: string,
    treeId: string
  ) {
    await DBUser.updateOne({
      userId: user,
    }, {
      $push: { trees: treeId }
    })
  }
}
export default User