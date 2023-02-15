class User {
  constructor(
    public _id: object,
    public user: string,
    public email: string,
    public password: string,
    public token: Array<string>,
    public treeName?: Array<object>,

  ) { }

}
export default User