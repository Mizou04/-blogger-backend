interface IRequest{
  id : string,
}


class deleteUserUseCase implements CommandUseCase<IRequest, IUser>{
  Repository : IUserRepository<IRequest>;
  constructor(repository : IUserRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest): Promise<void> {
    try{
      if(await this.Repository.getUser(request) === undefined) return;
      this.Repository.deleteUser(request);
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}