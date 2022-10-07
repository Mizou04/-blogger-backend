
import { BlogPostResponseDTO, BlogPostMinResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import { CommentVM } from "./CommentVM";
import { UserMinVM } from "./UserVM";

export class BlogPostVM{
  readonly id?: string | undefined;
  readonly title: string;
  readonly content: string;
  readonly overview: string;
  readonly createdAt: string | undefined;
  readonly lastModified?: string | undefined;
  readonly owner: UserMinVM;
  readonly comments: CommentVM[];
  readonly likes: Set<string>;
  
  constructor(params : {blogpostRes : BlogPostResponseDTO, commentsRes : CommentVM[], userResponse: UserMinVM}){
    this.id = params.blogpostRes.id;
    this.title = params.blogpostRes.title;
    this.content = params.blogpostRes.content;
    this.overview = params.blogpostRes.overview;
    this.createdAt = params.blogpostRes.createdAt?.toDateString();
    this.lastModified = params.blogpostRes.lastModified?.toDateString();
    this.owner = params.userResponse;
    this.comments = params.commentsRes;
    this.likes = params.blogpostRes.likes;
  }
}

export class BlogPostMinVM{
  readonly id? : string;
  readonly title: string;
  readonly comments: {length : number};
  readonly likes: Set<string>;
  readonly createdAt?: Date | undefined;
  readonly overview: string;
  readonly owner: UserMinVM;
  readonly thumbnail: string;
  constructor(params : {blogpostRes : BlogPostMinResponseDTO, commentsRes : {length : number}, userRes : UserMinVM}){
    this.id = params.blogpostRes.id;
    this.overview = params.blogpostRes.overview;
    this.title = params.blogpostRes.title;
    this.createdAt = params.blogpostRes.createdAt;
    this.owner = params.userRes;
    this.comments = params.commentsRes;
    this.likes = params.blogpostRes.likes;
    this.thumbnail = params.blogpostRes.thumbnail;
  }
}

// export interface BlogPstVM{
//   id : string,
//   likes : Set<string>
//   comments : Comment[],
//   owner : UserResponseMinDTO
// }