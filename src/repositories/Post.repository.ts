import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostGateway } from "@/interactors/common/db.gateway";
import { PostModel } from "@/infrastructure/db/models";
import { BlogPostParams } from "@/common/postParams";
import { UserVM } from "@/viewmodels/userVM";

export class PostRepository implements BlogPostGateway{
  async getPost(params: BlogPostParams): Promise<BlogPost | null> {
    try {
      let data : BlogPost | null;
      if(params.key == "id"){
        data = await PostModel.findOne({[params.key] : params.value})
      } else {
        data = await  PostModel.findOne({$regex : new RegExp(params.value, "igm")});
      }
      return data
    } catch (e) {
      throw e
    }
  } 
  // async setPost(params: { title: string; content: string; overview: string; readonly owner: Omit<UserVM, "lastModified" | "providerId" | "joinedAt" | "name">; }): Promise<null> {
  //   return new Promise((res, rej)=> res(null));
  // }
}