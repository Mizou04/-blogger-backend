import { InvalidInputError } from "@/common/customErrors";
import { v4 } from "uuid";
import Comment from "./Comment";


export default class BlogPost{
  readonly id? : string; // post id
  title : string;
  content : string;
  overview :string;
  thumbnail : string;
  readonly createdAt? : Date;
  lastModified? : Date;
  readonly ownerId : string;
  likes :  Set<string>; // like per user in that particular article
                        // likes are a set of users ids
  private constructor(params : BlogPost){
    this.id = v4().toString();
    this.title = params.title;
    this.content = params.content; 
    this.overview = params.overview; 
    this.thumbnail = params.thumbnail; 
    this.createdAt = new Date(); 
    this.lastModified = new Date(); 
    this.ownerId = params.ownerId;
    this.likes =  new Set();
  }

  static create(params : BlogPost): BlogPost{
    if(params.title.length < 20 || params.title.length > 80) throw new InvalidInputError("title length must be between 20 and 80 characters long");
    if(params.content.length < 320) throw new InvalidInputError("content length must be more than 320 characters long");
    if(params.overview.length > 120) throw new InvalidInputError("overview length must be less than 120 characters long");
    if(params.overview.length == 0 || !params.overview) params.overview = params.content.substring(0, 110) + "...";

    return new BlogPost(params);
  }

  like(likerID : string){ // like/dislike
    if(!this.likes.has(likerID)){
      this.likes.add(likerID);
    } else {
      this.likes.delete(likerID);
    }
  }

  // addComment(commentatorId : string, text : string){
  //   this.comments.data.add(Comment.create({commentatorId, content : text}));
  //   this.comments.length++;
  // }

};
