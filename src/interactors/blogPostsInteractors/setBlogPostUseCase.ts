interface IRequest{
  id : string,
}


class SetBlogPostUseCase implements CommandUseCase<IRequest, IBlogPost<IUser, IComment>>{
  Repository : IBlogPostRepository<IRequest>;
  constructor(repository : IBlogPostRepository<IRequest>){
    this.Repository = repository;
  }
  async execute(request: IRequest, params: IBlogPost<IUser, IComment>): Promise<void> {
    try{
      let article = new BlogPost(params);
      if(await this.Repository.getBlogPost(request)) throw new Error("Article already exists");
      this.Repository.setBlogPost(request, article);
    } catch(e){
      console.trace(e)
      throw e
    }
  }
}