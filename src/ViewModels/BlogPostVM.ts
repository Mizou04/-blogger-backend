import {BlogPost} from "@/Entities/BlogPost"


export class BlogPostVM{
  readonly id? : BlogPost["id"];
  readonly title? : BlogPost["title"];
  readonly content? : BlogPost["content"];
  readonly overview? : BlogPost["overview"];
  readonly createdAt? : BlogPost["createdAt"];
  readonly lastModified? : BlogPost["lastModified"];
  readonly owner? : BlogPost["owner"];
  
  constructor(blogpost : BlogPost){
    this.id = blogpost.id;
    this.title = blogpost.title;
    this.content = blogpost.content;
    this.overview = blogpost.overview;
    this.createdAt = blogpost.createdAt;
    this.lastModified = blogpost.lastModified;
    this.owner = blogpost.owner;
  }
}

