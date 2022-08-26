import { BlogPostMinResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { UserMinResponseDTO, UserResponseDTO } from "@/common/DTOs/User/UserResponseDTO";

export class UserVM{
  readonly id? : string;
  readonly providerId? : string;
  readonly username : string;
  readonly email : string;
  readonly joinedAt? : string;
  readonly lastModified? : string;
  readonly profilePic? : string;
  readonly coverPic? : string;
  readonly blogPosts? : BlogPostMinResponseDTO[];
  constructor(user : UserResponseDTO){
    this.id = user.id;
    this.providerId = user.providerId;
    this.username = user.username;
    this.email = user.email;
    this.joinedAt = user.joinedAt?.toString();
    this.lastModified = user.lastModified?.toString();
    this.blogPosts = [];
    this.profilePic = user.profilePic;
    this.coverPic = user.coverPic;
  }
}

export class UserMinVM{
  id?: string;
  email: string;
  profilePic?: string;
  username: string;

  constructor(params : UserMinResponseDTO){
    this.id = params.id;
    this.email = params.email;
    this.profilePic = params.profilePic;
    this.username = params.username;
  }
}