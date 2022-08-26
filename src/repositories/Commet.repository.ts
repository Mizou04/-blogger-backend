import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import Comment from "@/Entities/Comment";
import { CommentGateway } from "@/interactors/_common/comment.db.gateway";
import {CommentModel} from "@/infrastructure/db/models"
import { DBError } from "@/common/customErrors";

export default class CommentRepository implements CommentGateway {
  async getComments(params: { postId: string; }): Promise<CommentResponseDTO[]> {
    try {
      let response : CommentResponseDTO[] = await CommentModel.find({postId : params.postId});
      return response;
    } catch (error) {
      throw error
    }
  }
  async getComment(params: { id: string; postId : string }): Promise<CommentResponseDTO> {
    try {
      let response : CommentResponseDTO | null = await CommentModel.findOne({postId : params.postId, "data.id" : params.id});
      if(!response){
        throw new DBError("comment not found")
      }
      return response;  
    } catch (error) {
      throw error
    }
  }
  async setComment(params: Comment): Promise<null> {
    try {
      if(!await CommentModel.create(params)) throw new DBError("Can't create comment");
      return null;
    } catch (error) {
      throw error;
    }
  }
  
}