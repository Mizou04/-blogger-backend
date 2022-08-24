import { Range } from "@/common/Range";
import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";
import { BlogPostGateway } from "./common/db.gateway";
import {BlogPostRepository} from "@/repositories/BlogPost.repository"

export class GetBlogPostsGroup implements getBlogPostsGroupInputPort{
  constructor(public outputport: getBlogPostsGroupOutputPort, public gateway : BlogPostGateway){
    this.outputport = outputport;
    this.gateway = gateway;  
  }
  /**
   * if params doesn't exist we shall get all the blog posts
   * 
   * @param params can be range {1 to 10 or 1 to 20} (may be the default)
   * 
   * @param params can be string and used in a regularExpression (for filtering)
   * 
   * @param params can be category (for filtering)
   */
    async execute<T>(params? : T, criteria?: T extends string ? "title" | "category" | "content" : null): Promise<any> {
    try {
      let data : BlogPost[] = await this.gateway.getBlogPosts<T>(params, criteria);
      return this.outputport.present(data);
    } catch (error) {
      throw error
    }
  }
}

export interface getBlogPostsGroupInputPort{
  gateway : BlogPostGateway,
  outputport : getBlogPostsGroupOutputPort,
  execute<T>(params? : T, criteria?: T extends string ? "title" | "category" | "content" : null) : Promise<any>,
}

export interface getBlogPostsGroupOutputPort{
  present(data : BlogPost[]) : BlogPostVM[]
}

new GetBlogPostsGroup({present([]){return []}}, new BlogPostRepository()).execute<string>()