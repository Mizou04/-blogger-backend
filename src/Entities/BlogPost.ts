import { InvalidInputError } from "@/common/customErrors";
import { UserVM } from "@/viewmodels/userVM";
import { v4 } from "uuid";

export class BlogPost{
  readonly id : string;
  title : string;
  content : string;
  overview :string;
  readonly createdAt : Date;
  lastModified : Date;
  readonly owner : Omit<UserVM, "providerId" | "lastModified" | "joinedAt" | "name">;
  private constructor(params : BlogPost){
    this.id = params.id || v4().toString().replace(/-/igm, '');
    this.title = params.title;
    this.content = params.content; 
    this.overview = params.overview; 
    this.createdAt = params.createdAt || new Date(); 
    this.lastModified = params.lastModified; 
    this.owner = params.owner; 
  }

  static create(params : BlogPost): BlogPost{
    if(params.title.length < 20 || params.title.length > 80) throw new InvalidInputError("title length must be between 20 and 80 characters long");
    if(params.content.length < 320) throw new InvalidInputError("content length must be more than 320 characters long");
    if(params.overview.length > 120) throw new InvalidInputError("overview length must be less than 120 characters long");
    if(params.overview.length == 0 || !params.overview) params.overview = params.content.substring(0, 110) + "...";
    return new BlogPost(params);
  }

};