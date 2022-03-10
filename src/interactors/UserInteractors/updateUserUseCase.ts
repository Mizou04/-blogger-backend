interface IRequest{
  id : string,
}


class UpdateUserUseCase implements CommandUseCase<IRequest, IUser>{
  Repository : IUserRepository<IRequest>;
  constructor(repository : IUserRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest, params: IUser): Promise<void> {
    try{
      if((await this.Repository.getUser(request)) === undefined) throw new Error("Article doesn't exist");
      this.Repository.updateUser(request, params);
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}