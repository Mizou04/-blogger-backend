import BlogPost from "@/Entities/BlogPost";
import { BlogPostGateway } from "@/interactors/_common/db.gateway";
import {PostModel as BlogPostModel } from "@/infrastructure/db/models";
import { BlogPostParams } from "@/common/BlogPostParams";
import { UserVM } from "@/ViewModels/UserVM";
import { DBError } from "@/common/customErrors";
import { Range } from "@/common/Range";
import { projectionFromArray } from "@/helpers/mongoDB.helpers";
import { BlogPostMinResponseDTO, BlogPostResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import * as PROJECTION from "@/common/projections"

class BlogPostRepository implements BlogPostGateway{
  async getExistedBlogPostsLength(filter?: any): Promise<number> {
    try {
      let count = BlogPostModel.find(filter).count();
      return count
    } catch (error) {
      throw new DBError((error as Error).message)
    }
  }

  async getBlogPosts(sizeOrRange?: number | Range | undefined, criteria?: BlogPostParams | undefined, projection?: string[] | undefined, filter?: any): Promise<BlogPostMinResponseDTO[]> {
    try {
      let data : BlogPostMinResponseDTO[] = [];
      let query : {}[] = [];
      let ens = Object.entries(criteria || {});
      ens.map(e => query.push({[e[0]] : e[1]}));
      let response = BlogPostModel.find({$or : query ,filter}, PROJECTION.blogPostMinResponseDTOProjection);
      if(typeof sizeOrRange == "number"){
        data = await response.limit(sizeOrRange);
        return data;    
      }
      if(sizeOrRange instanceof Range){
        data = await response.skip(sizeOrRange?.from - 1).limit(sizeOrRange?.to - sizeOrRange?.from + 1)
        return data;
      }
      data = await response.exec();
      if(data.length == 0){
        throw new DBError("no Results...")
      }
      return data;
    } catch (error) {
      throw error
    }
  }
  async getBlogPost(criteria: BlogPostParams, filter?: any): Promise<BlogPostResponseDTO> {
    /**transform an object to array of objects containing (key:value)s of original object */
    let query : {}[] = [];
    let ens = Object.entries(criteria);
    ens.map(e => query.push({[e[0]] : e[1]}));

    let data = await BlogPostModel.findOne({filter , $or : query}, PROJECTION.blogPostResponseDTOProjection).exec();
    if(!data) throw new Error("no Result...");
    return data;
  }
  async setBlogPost(params: BlogPost): Promise<null> {
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
  async deletePost(params: BlogPostParams): Promise<null> {
    return null
  }
  async updatePost(params: BlogPostParams, newBlogPostData: Partial<BlogPost>): Promise<null> {
    return null
  }
}

let blogPostRepository = new BlogPostRepository();

export default blogPostRepository;
// export class BlogPostRepository implements BlogPostGateway{
//   async getBlogPost(params: BlogPostParams): Promise<BlogPost> {
//     try {
//       let data : BlogPost | null;
//       if(params.key == "id"){
//         data = await BlogPostModel.findOne({[params.key] : params.value})
//       } else {
//         data = await BlogPostModel.findOne({[params.key] :{$regex : new RegExp(params.value, "igm")}});
//       }
//       if(!data || !data.id){
//         throw new DBError("Blogpost not found");
//       }
//       return data
//     } catch (e) {
//       throw e
//     }
//   }

//   async getBlogPostContent(id: string): Promise<BlogPostContent> {
//     try {
//       let data : BlogPostContent | null = await BlogPostContentModel.findOne({id : id});
//       if(data?.id == id){
//         return data;
//       }
//       throw new DBError("content is missing!")
//     } catch (error) {
//       throw error
//     }
//   }
  
//   async getBlogPosts(params: Range | number, criteria?: "title" | "ownerID" | null): Promise<BlogPost[]> {
//     try {
//       let data : BlogPost[];
//       if(typeof params == "number"){
//         data = await BlogPostModel.find().limit(params);
//       } else if(typeof params == "string"){
//         data = await BlogPostModel.find({[criteria as string] : {$regex : new RegExp(params)}})
//       } else if (params instanceof Range){
//         data = await BlogPostModel.find().skip(params.from - 1).limit(params.to - params.from + 1)
//       } else{
//         data = await BlogPostModel.find();
//       }
//       if(data.length == 0){
//         throw new DBError("No Result...")
//       }
//       return data;
//     } catch (error) {
//       throw error
//     }
//   }
  
//   async setBlogPost(params: BlogPost): Promise<null> {
//     try {
//       let bp = new BlogPostModel(params);
//       let data = await bp.save();
//       if(data && data.title == params.title){
//         return null
//       }
//       throw new DBError("can't create Blogpost")
//     } catch (err) {
//       throw err;
//     };
//   }

//   async setBlogPostContent(params: BlogPostContent): Promise<null> {
//     try {
//       let bp = new BlogPostContentModel(params);
//       let data = await bp.save();
//       if(data && data.id == params.id){
//         return null;
//       }
//       throw new DBError("can't create Blogpost content")
//     } catch (e) {
//       throw e;
//     }
//   }

//   async getExistedBlogPostsLength(filter? : any): Promise<number> {
//     try {
//       let data = await BlogPostModel.count(filter)
//       if(data){
//         return data;
//       }
//       throw new DBError("can't get the count")
//     } catch (error) {
//       throw error
//     }
//   }
  
// }

