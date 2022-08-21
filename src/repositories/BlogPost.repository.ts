import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostGateway } from "@/interactors/common/db.gateway";
import { PostModel as BlogPostModel } from "@/infrastructure/db/models";
import { BlogPostParams } from "@/common/BlogPostParams";
import { UserVM } from "@/viewmodels/userVM";
import { DBError } from "@/common/customErrors";

export class BlogPostRepository implements BlogPostGateway{
  async getBlogPost(params: BlogPostParams): Promise<BlogPost> {
    try {
      let data : BlogPost | null;
      if(params.key == "id"){
        data = await BlogPostModel.findOne({[params.key] : params.value})
      } else {
        data = await BlogPostModel.findOne({[params.key] :{$regex : new RegExp(params.value, "igm")}});
      }
      if(!data || !data.id){
        throw new DBError("Blogpost not found");
      }
      return data
    } catch (e) {
      throw e
    }
  } 
  async setBlogPost(params: { title: string; content: string; overview: string; readonly owner: Omit<UserVM, "lastModified" | "providerId" | "joinedAt" | "name">; }): Promise<null> {
    try {
      let bp = new BlogPostModel(params);
      let data = await bp.save();
      if(data && data.title == params.title){
        return null
      }
      throw new DBError("can't create Blogpost")
    } catch (err) {
      throw err;
    };
  }
}