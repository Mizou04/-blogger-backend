import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import Comment from "@/Entities/Comment";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import { BaseInteractor } from "../_common/BaseInteractor";
import { CommentGateway } from "../_common/comment.db.gateway";


export default class SetComment implements SetCommentInputPort{
  constructor(public gateway : CommentGateway, public outputPort : SetCommentOutputPort){
    this.gateway = gateway;
    this.outputPort = outputPort;
  }
  async execute(params: CommentResponseDTO): Promise<null> {
    try {
      let comment = Comment.create(params)
      await this.gateway.setComment(comment);
      return this.outputPort.present(null);
    } catch (error) {
      throw error;
    }
  }

}


export interface SetCommentInputPort extends BaseInteractor<CommentResponseDTO, Promise<null>>{}

export interface SetCommentOutputPort extends BasePresenter<null, null>{
  
}