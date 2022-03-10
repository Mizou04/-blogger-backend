declare interface IBlogPostRepository<R>{
  getBlogPost(options : unknown) : Promise<IBlogPost<IUser, IComment>>,
  setBlogPost(options : R, payload : IBlogPost<IUser, IComment>) : Promise<void>,
  updateBlogPost(options : R, payload : IBlogPost<IUser, IComment>) : Promise<void>,
  deleteBlogPost(options : R) : Promise<void>,
}