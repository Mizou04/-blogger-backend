interface IRequest{
  id : string,
}

class GetUserByIdUseCase implements QueryUseCase<IRequest, Promise<IUser>>{
  Repository : IUserRepository<IRequest>;
  constructor(repository : IUserRepository<IRequest>){
    this.Repository = repository;
  }
  execute(request: IRequest): Promise<IUser> {
    return this.Repository.getUser(request);
  }
}