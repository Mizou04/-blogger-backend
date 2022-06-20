import { userParams } from "@/common/userParams";
import User from "@/Entities/User"
import { UserVM } from "@/viewmodels/userVM"
import { UserGateway } from "./common/db.gateway";


export default class GetUser implements GetUserInputPort{
  readonly outputPort: GetUserOutputPort;
  readonly gateway : UserGateway;
  constructor(outputport : GetUserOutputPort, gateway : UserGateway){
    this.outputPort = outputport;
    this.gateway = gateway;
  }
  async execute(params: userParams): Promise<UserVM> {
    try{
      let user = await this.gateway.getUser(params);
      if(user){
        return this.outputPort.present(user)
      } else {
        throw new Error("user not found")
      }
    } catch (e){
      throw e
    }
  }
}



export interface GetUserInputPort{
  readonly outputPort : GetUserOutputPort,
  readonly gateway : UserGateway
  execute(params : {criteria : "id" | "username", value : User["id" | "username"]}) : Promise<UserVM>
}

export interface GetUserOutputPort{
  present(value : User) : UserVM
}

