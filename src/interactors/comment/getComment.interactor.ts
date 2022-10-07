import { CommentResponseDTO } from "@/common/DTOs/Comment/CommentResponseDTO";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import { CommentVM } from "@/ViewModels/CommentVM";
import { BaseInteractor } from "../_common/BaseInteractor";


export default class GetComment implements GetCommentInputPort{
  constructor(public gateway : {getComment(params: {id : string, ownerId : string}) : Promise<CommentResponseDTO | null>}, public outputPort : GetCommentOutputPort){
    this.gateway = gateway;
    this.outputPort = outputPort;
  }
  async execute(params: {id : string, ownerId : string}): Promise<CommentVM | null> {
    try {
      let comment = await this.gateway.getComment(params) as CommentResponseDTO;
      return this.outputPort.present(comment);
    } catch (error) {
      throw error;
    }
  }

}


export interface GetCommentInputPort extends BaseInteractor<{id : string, ownerId : string}, Promise<CommentVM | null>>{}

export interface GetCommentOutputPort extends BasePresenter<CommentResponseDTO, CommentVM | null>{
  
}