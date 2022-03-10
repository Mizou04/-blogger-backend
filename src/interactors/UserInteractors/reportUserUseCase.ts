interface IRequest{
  id : string,
}


class ReportUserUseCase implements CommandUseCase<IRequest, IUser>{
  Repository : IUserRepository<IRequest>;
  constructor(repository : IUserRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest, params: IUser): Promise<void> {
    try{
      let user = await this.Repository.getUser(request);
      if(user === undefined) throw new Error("User doesn't exist");
      this.Repository.updateUser(request, {...user, restricted : params["restricted"]});
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}