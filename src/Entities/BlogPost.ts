import { InvalidInputError } from "@/common/customErrors";
import { UserVM } from "@/viewmodels/userVM";
import { v4 } from "uuid";

export default class BlogPost{
  readonly id : string;
  title : string;
  // content : { // chunks of text. that could be fetched on demand so we only get the first chunk not the whole content
  //   [key : string] : string
  // };
  content : string;
  private meta : {[key : string] : string} = {};
  readonly createdAt : Date;
  lastModified : Date;
  readonly owner : Omit<UserVM, "email" | "providerId" | "lastModified" | "joinedAt">;
  private constructor(params : BlogPost){
    this.id = params.id || v4().toString().replace(/-/igm, '');
    this.title = params.title;
    this.content = params.content; 
    this.createdAt = params.createdAt || new Date(); 
    this.lastModified = params.lastModified; 
    this.owner = params.owner; 
  }

  static create(params : BlogPost): BlogPost{
    if(params.title.length < 20 || params.title.length > 80) throw new InvalidInputError("title length must be between 20 and 80 characters long");
    return BlogPost.create(params);
  }

  // chunkContent(){
  //   let fit = Math.ceil(this.content.length / 240);
  //   let chunk = "";
  //   for(let i = 0; i < fit ; i++){
  //     let lastBorder = chunk.length < 240 ?  : this.content.lastIndexOf(" ", 10);
  //     chunk = this.content.slice(i * lastBorder, lastBorder);
  //     this.meta[i+1] = chunk;
  //   }
  // }

};