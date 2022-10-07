import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import { UserResponseMinDTO } from "@/Entities/User";
import { UserMinVM } from "./UserVM";

export class CommentVM{
  public readonly id?: string;
  public readonly postId: string;
  public readonly owner: UserMinVM;
  public readonly content: string;
  public readonly createdAt?: string;
  public readonly lastModified?: string;

  constructor(params : {comment : CommentResponseDTO, user : UserMinVM}){
    this.id = params.comment.id;
    this.postId = params.comment.postId
    this.owner = params.user;
    this.createdAt = params.comment.createdAt?.toDateString();
    this.lastModified = params.comment.lastModified?.toDateString();
    this.content = params.comment.content
  }
}