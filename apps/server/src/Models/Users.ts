import { DBUser } from "../lib/mongo"

class User {
  constructor(
    public _id: object,
    public user: string,
    public email: string,
    public accessToken: string,
    public tokens: Array<string>,
    public treeName?: Array<object>,

  ) { }

  static async create(
    _id: object,
    user: string,
    email: string,
    accessToken: string,
    tokens: Array<string>

  ): Promise<User> {

    await DBUser.create({ _id, user, email, undefined, tokens })

    return new User(_id, user, email, accessToken, tokens)
  }
}
export default User