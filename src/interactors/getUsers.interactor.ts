import { DBError } from "@/common/customErrors";
import { UserMinResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { Range } from "@/common/Range";
import { userParams } from "@/common/userParams";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import { UserMinVM, UserVM } from "@/ViewModels/UserVM"
import { BaseInteractor } from "./_common/BaseInteractor";
import { UserGateway } from "./_common/db.gateway";


export default class GetUsers implements GetUsersInputPort{
  readonly outputPort: GetUsersOutputPort;
  readonly gateway : UserGateway;
  constructor(outputport : GetUsersOutputPort, gateway : UserGateway){
    this.outputPort = outputport;
    this.gateway = gateway;
  }
  async execute(params: number | Range, criteria? : userParams, filter? : string[]): Promise<UserMinVM[]> {
    try{
      let user = await this.gateway.getUsers(params, criteria, filter);
      if(!user){
        throw new DBError("no results")
      } else {
        return this.outputPort.present(user)
      }
    } catch (e){
      throw e
    }
  }
}



export interface GetUsersInputPort extends BaseInteractor<Range | number, Promise<UserMinVM[]>>{
  readonly outputPort : GetUsersOutputPort,
  readonly gateway : UserGateway,
  execute(params? : Range | number, criteria? : userParams, filter? : string[] | string) : Promise<UserMinVM[]>
  
}

export interface GetUsersOutputPort extends BasePresenter<UserMinResponseDTO[], UserMinVM[]>{

}

