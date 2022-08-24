import { BlogPostParams } from "@/common/BlogPostParams";
import { Range } from "@/common/Range";
import { userParams } from "@/common/userParams";
import { BlogPost, TBlogpost } from "@/Entities/BlogPost";
import User from "@/Entities/User";

export type TUser = Omit<User, "id" | "joinedAt" | "lastModified">;

export interface UserGateway{
  getUser(params : userParams) : Promise<User | null>,
  setUser(params : TUser) : Promise<null>,
  updateUser(params : userParams, newUserData : TUser) : Promise<null>,
  deleteUser(params : TUser) : Promise<null>,
}

export interface BlogPostGateway{
  getBlogPosts<T>(params? : T, criteria?: T extends string ? "title" | "category" | "content" : null) : Promise<BlogPost[]>,
  getBlogPost(params : BlogPostParams) : Promise<BlogPost>,
  setBlogPost(params :  TBlogpost) : Promise<null>,

  // updatePost(params :  TBlogpost, newBlogPostData : TBlogpost) : Promise<null>,
  // deletePost(params :  TBlogpost, newBlogPostData : TBlogpost) : Promise<null>,
}
