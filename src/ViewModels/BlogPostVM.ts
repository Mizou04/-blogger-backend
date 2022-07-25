import {BlogPost} from "@/Entities/BlogPost"


export class BlogPostVM{
  readonly id? : string;
  readonly title? : string;
  readonly content? : string;
  readonly overview? : string;
  readonly createdAt? : string;
  readonly lastModified? : string;
  readonly owner? : BlogPost["owner"];
  
  constructor(blogpost : BlogPost){
    this.id = blogpost.id;
    this.title = blogpost.title;
    this.content = blogpost.content;
    this.overview = blogpost.overview;
    this.createdAt = blogpost.createdAt.toDateString();
    this.lastModified = blogpost.lastModified.toDateString();
    this.owner = blogpost.owner;
  }
}

