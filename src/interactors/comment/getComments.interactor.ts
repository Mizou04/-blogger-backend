import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import { CommentVM } from "@/ViewModels/CommentVM";
import { BaseInteractor } from "../_common/BaseInteractor";
import { CommentGateway } from "../_common/comment.db.gateway";



export default class GetComments implements GetCommentsInputPort{
  constructor(public gateway : CommentGateway, public outputPort : GetCommentsOutputPort){
    this.outputPort = outputPort;
    this.gateway = gateway;
  }
  async execute(params: { postId: string; }): Promise<CommentVM[]> {
    try {
      let comments = await this.gateway.getComments(params);
      return this.outputPort.present(comments)
    } catch (error) {
      throw error;
    }
  }
}


export interface GetCommentsInputPort extends BaseInteractor<{postId : string}, Promise<CommentVM[]>>{}

export interface GetCommentsOutputPort extends BasePresenter<CommentResponseDTO[] | null, CommentVM[]>{}