import { InvalidInputError } from "@/common/customErrors";
import { IOwner } from "@/common/owner";
import { UserVM } from "@/viewmodels/userVM";
import { v4 } from "uuid";

export type TBlogpost = Omit<BlogPost, "id" | "createdAt" | "lastModified">;

export class BlogPost{
  readonly id : string;
  title : string;
  content : string;
  overview :string;
  thumbnail : string;
  readonly createdAt : Date;
  lastModified : Date;
  readonly owner : IOwner;
  comments : {
    length : number,
    data : Record<string, {
      readonly owner : IOwner,
      text : string,
      readonly date : Date,
      lastModified : Date,
      id : string // owner id + blogpost id + incremental index
    }>
  };
  likes : {
    length : number,
    data : Record<IOwner["id"], IOwner["id"]> // like per user in that particular article
  }
  private constructor(params : TBlogpost){
    this.id = v4().toString().replace(/-/igm, '');
    this.title = params.title;
    this.content = params.content; 
    this.overview = params.overview; 
    this.thumbnail = params.thumbnail; 
    this.createdAt = new Date(); 
    this.lastModified = new Date(); 
    this.owner = params.owner;
    this.comments = {length : 0, data : {}};
    this.likes = {length : 0, data : {}}
  }

  static create(params : TBlogpost): BlogPost{
    if(params.title.length < 20 || params.title.length > 80) throw new InvalidInputError("title length must be between 20 and 80 characters long");
    if(params.content.length < 320) throw new InvalidInputError("content length must be more than 320 characters long");
    if(params.overview.length > 120) throw new InvalidInputError("overview length must be less than 120 characters long");
    if(params.overview.length == 0 || !params.overview) params.overview = params.content.substring(0, 110) + "...";
    return new BlogPost(params);
  }

  like(){
    if(!this.likes.data[this.owner.id]){
      this.likes.data[this.owner.id] = this.owner.id;
      this.likes.length++;
    } else {
      delete this.likes.data[this.owner.id];
      this.likes.length--;
    }
  }

};