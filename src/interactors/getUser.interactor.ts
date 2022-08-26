import { BaseInteractor } from "@/interactors/_common/BaseInteractor";
import { DBError } from "@/common/customErrors";
import { userParams } from "@/common/userParams";
import User from "@/Entities/User"
import { UserMinVM, UserVM } from "@/ViewModels/UserVM"
import { UserGateway } from "./_common/db.gateway";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import GetUserPresenter from "@/presenters/user/GetUser.Presenter";
import { UserMinResponseDTO, UserResponseDTO } from "@/common/DTOs/User/UserResponseDTO";


export default class GetUser implements GetUserInputPort{

  constructor(public outputPort : GetUserOutputPort, public gateway : UserGateway){
    this.outputPort = outputPort;
    this.gateway = gateway;
  }
  async execute<T = boolean>(params: { userParams: userParams; complete: T; }): Promise<T extends true ? UserVM : UserMinVM> {
    try{
      let user = await this.gateway.getUser<T>(params.userParams, params.complete);
      if(user !== null){
        return this.outputPort.present(user)
      } else {
        throw new DBError("user not found")
      }
    } catch (e){
      throw e
    }    
  }
}



export abstract class GetUserInputPort extends BaseInteractor<{userParams : userParams, complete : boolean}, Promise<UserVM | UserMinVM>>{
  abstract execute<T = boolean>(params: {userParams : userParams, complete : T}) : Promise<T extends true ? UserVM : UserMinVM>;
}

export interface GetUserOutputPort extends BasePresenter<UserResponseDTO | UserMinResponseDTO, UserVM | UserMinVM>{
}