declare interface IUserRepository<R>{
  getUser(options : unknown) : Promise<IUser>,
  setUser(options : R, payload : IUser) : Promise<void>,
  updateUser(options : R, payload : IUser) : Promise<void>,
  deleteUser(options : R) : Promise<void>,
}