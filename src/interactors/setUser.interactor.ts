import { userParams } from "@/common/userParams";
import User from "@/Entities/User"
import { UserVM } from "@/viewmodels/userVM"
import { UserGateway } from "./common/db.gateway";


export default class SetUser implements SetUserInputPort{
  readonly outputPort: SetUserOutputPort;
  readonly gateway : UserGateway;
  constructor(outputport : SetUserOutputPort, gateway : UserGateway){
    this.outputPort = outputport;
    this.gateway = gateway;
  }
  async execute(user: User): Promise<string> {
    return this.outputPort.present({})
  }
}



export interface SetUserInputPort{
  readonly outputPort : SetUserOutputPort,
  readonly gateway : UserGateway
  execute(user : User) : Promise<string>
}

export interface SetUserOutputPort{
  present(something : any) : string
}

