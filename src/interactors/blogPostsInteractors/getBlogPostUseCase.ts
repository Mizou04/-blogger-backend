interface IRequest{
  id : string,
}

class GetBlogPostByIdUseCase implements QueryUseCase<IRequest, Promise<IBlogPost<IUser, IComment>>>{
  Repository : IBlogPostRepository<IRequest>;
  constructor(repository : IBlogPostRepository<IRequest>){
    this.Repository = repository;
  }
  execute(request: IRequest): Promise<IBlogPost<IUser, IComment>> {
    return this.Repository.getBlogPost(request);
  }
}