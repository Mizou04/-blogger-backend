import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostGateway } from "@/interactors/common/db.gateway";
import { PostModel as BlogPostModel } from "@/infrastructure/db/models";
import { BlogPostParams } from "@/common/BlogPostParams";
import { UserVM } from "@/viewmodels/userVM";
import { DBError } from "@/common/customErrors";
import { Range } from "@/common/Range";

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

  async getBlogPosts<T>(params: T, criteria?: T extends string ? "title" | "category" | "content" : null): Promise<BlogPost[]> {
    try {
      let data : BlogPost[];
      if(typeof params == "number"){
        data = await BlogPostModel.find().limit(params);
      } else if(typeof params == "string"){
        data = await BlogPostModel.find({[criteria as string] : {$regex : new RegExp(params)}})
      } else if (params instanceof Range){
        data = await BlogPostModel.find().skip(params.from - 1).limit(params.to - params.from + 1)
      } else{
        data = await BlogPostModel.find();
      }
      if(data.length == 0){
        throw new DBError("No Result...")
      }
      return data;
    } catch (error) {
      throw error
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

  async getExistedBlogPostsLength(filter? : any): Promise<number> {
    try {
      let data = await BlogPostModel.count(filter)
      if(data){
        return data;
      }
      throw new DBError("can't get the count")
    } catch (error) {
      throw error
    }
  }
  
}

