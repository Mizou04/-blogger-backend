import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import Comment from "@/Entities/Comment";

export interface CommentGateway{

  getComments(params : {postId : string}) : Promise<CommentResponseDTO[] | null> 
  getComment(params : {id : string}) : Promise<CommentResponseDTO | null>
  setComment(params : Comment): Promise<null> 

}