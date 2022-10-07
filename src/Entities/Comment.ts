import { InvalidInputError } from "@/common/customErrors";

export default class Comment{
  public readonly id? : string;
  public readonly postId : string; // the id of the blogpost used to fetch the comments of this particular blogpost
  public readonly ownerId : string;
  public content : string;
  public readonly createdAt? : Date;
  public lastModified? : Date;
  private constructor(params : Comment){
    this.ownerId = params.ownerId;
    this.content = params.content;
    this.createdAt = new Date();
    this.postId = params.postId;
    this.id = params.ownerId + Date.now();
    this.lastModified = this.createdAt;
  }

  static create(params : Comment){
    if(params.content.length > 160) throw new InvalidInputError("comment too long"); 
    if((params.lastModified instanceof Date && params.createdAt instanceof Date) && params.lastModified < params.createdAt) throw new InvalidInputError("invalid date");
    return new Comment(params);
  }
}
