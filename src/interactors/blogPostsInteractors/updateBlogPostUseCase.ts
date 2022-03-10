interface IRequest{
  id : string,
}


class updateBlogPostUseCase implements CommandUseCase<IRequest, IBlogPost<IUser, IComment>>{
  Repository : IBlogPostRepository<IRequest>;
  constructor(repository : IBlogPostRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest, params: IBlogPost<IUser, IComment>): Promise<void> {
    try{
      if((await this.Repository.getBlogPost(request)) === undefined) throw new Error("Article doesn't exist");
      this.Repository.updateBlogPost(request, params);
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}