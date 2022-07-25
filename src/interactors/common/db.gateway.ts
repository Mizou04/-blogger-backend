import { BlogPostParams } from "@/common/postParams";
import { userParams } from "@/common/userParams";
import { BlogPost } from "@/Entities/BlogPost";
import User from "@/Entities/User";

type TUser = Omit<User, "id" | "joinedAt" | "lastModified">;
type TBlogpost = Omit<BlogPost, "id" | "createdAt" | "lastModified">;

export interface UserGateway{
  getUser(params : userParams) : Promise<User | null>,
  setUser(params : TUser) : Promise<null>,
  updateUser(params : userParams, newUserData : TUser) : Promise<null>,
  deleteUser(params : TUser) : Promise<null>,
}

export interface BlogPostGateway{
  getPost(params : BlogPostParams) : Promise<BlogPost | null>,
  // setPost(params :  TBlogpost) : Promise<null>,
  // updatePost(params :  TBlogpost, newBlogPostData : TBlogpost) : Promise<null>,
  // deletePost(params :  TBlogpost, newBlogPostData : TBlogpost) : Promise<null>,
}