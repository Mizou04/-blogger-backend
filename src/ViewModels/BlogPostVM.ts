import {BlogPost} from "@/Entities/BlogPost"

export class BlogPostVM{
  readonly id? : string;
  readonly title? : string;
  readonly content? : string;
  readonly overview? : string;
  readonly createdAt? : string;
  readonly lastModified? : string;
  readonly owner? : BlogPost["owner"];
  readonly comments : BlogPost["comments"];
  readonly likes : BlogPost["likes"];
  
  constructor(blogpost : BlogPost){
    this.id = blogpost.id;
    this.title = blogpost.title;
    this.content = blogpost.content;
    this.overview = blogpost.overview;
    this.createdAt = blogpost.createdAt.toDateString();
    this.lastModified = blogpost.lastModified.toDateString();
    this.owner = blogpost.owner;
    this.comments = blogpost.comments;
    this.likes = blogpost.likes;
  }
}

export class BlogPostMinVM implements Omit<BlogPostVM, "content" | "comments" | "likes">{
  readonly id? : string;
  readonly title? : string;
  readonly overview? : string;
  readonly createdAt? : string;
  readonly lastModified? : string;
  readonly owner? : BlogPost["owner"];
  readonly comments : {length : number};
  readonly likes : {length : number};
  constructor(blogpost : BlogPost){
    this.id = blogpost.id;
    this.title = blogpost.title;
    this.overview = blogpost.overview;
    this.createdAt = blogpost.createdAt.toDateString();
    this.lastModified = blogpost.lastModified.toDateString();
    this.owner = blogpost.owner;
    this.comments = blogpost.comments;
    this.likes = blogpost.likes;
  }
}