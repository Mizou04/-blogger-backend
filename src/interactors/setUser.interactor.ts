import { DBError } from "@/common/customErrors";
import { userParams } from "@/common/userParams";
import User from "@/Entities/User"
import { UserVM } from "@/viewmodels/userVM"
import { UserGateway } from "./common/db.gateway";


export default class SetUser implements SetUserInputPort{
  outputPort : SetUserOutputPort;
  gateway : UserGateway;
  constructor(outputPort : SetUserOutputPort, userRepository : UserGateway){
    this.outputPort = outputPort;
    this.gateway = userRepository;
  }
  async execute(user: User): Promise<null> {
    try {
      const existedUser = await this.gateway.getUser({providerId : user.providerId || "", email : user.email || "", username : user.username || ""});
      if(existedUser &&  existedUser?.username === user.username) throw new DBError(`User with username : ${user.username} already exists`);
      if(existedUser &&  existedUser?.email === user.email) throw new DBError(`User with email : ${user.email} already exists`);
      if(existedUser && existedUser?.providerId === user.providerId) throw new DBError(`User with this provider already exists`);
      this.gateway.setUser(user);
      return this.outputPort.present();
    } catch (e) {
      throw e
    }
  }
}

export interface SetUserInputPort{
  readonly outputPort : SetUserOutputPort,
  readonly gateway : UserGateway
  execute(user : User) : Promise<null>
}

export interface SetUserOutputPort{
  present(something? : any) : null
}

