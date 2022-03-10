interface IRequest{
  id : string,
}


class deleteBlogPostUseCase implements CommandUseCase<IRequest, IBlogPost<IUser, IComment>>{
  Repository : IBlogPostRepository<IRequest>;
  constructor(repository : IBlogPostRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest): Promise<void> {
    try{
      if(await this.Repository.getBlogPost(request) === undefined) return;
      this.Repository.deleteBlogPost(request);
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}