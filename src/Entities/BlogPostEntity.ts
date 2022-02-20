let blogPosts : Partial<IBlogPost>[] = [];


export function getBlogPost(id : string) : IBlogPost | undefined{
  if(id === "") return;
  return (blogPosts as IBlogPost[]).find(bp => {
    if(bp.id === id){
      return bp.id === id;
    } else {
      return new PseudoBlogPost();
    }
  })
}

export function setBlogPost(blogData : Partial<IBlogPost>) : boolean{
  blogPosts.push(blogData);
  return true;
}

export function removeBlogPost(id : string) : boolean{
  if(getBlogPost(id)){
    blogPosts.filter(bp => bp.id !== id);
    return true;
  }
  return false
}

class PseudoBlogPost implements IBlogPost{
  id = "undefined";
  comments : IComment[] = [{owner : {name : "not defined", id : "null"}, text : "not defined" }];
  thumb : string = "/path/to/default/image";
  title: string = "null";
}