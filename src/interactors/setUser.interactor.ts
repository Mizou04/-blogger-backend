import { DBError } from "@/common/customErrors";
import { UserResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import User from "@/Entities/User"
import { BaseInteractor } from "./_common/BaseInteractor";
import { UserGateway } from "./_common/db.gateway";


export default class SetUser implements SetUserInputPort{
  outputPort : SetUserOutputPort;
  gateway : UserGateway;
  constructor(outputPort : SetUserOutputPort, userRepository : UserGateway){
    this.outputPort = outputPort;
    this.gateway = userRepository;
  }
  async execute(user: User): Promise<{ title: string; message: string; }> {
    try {
      const existedUser : UserResponseDTO | null = await this.gateway.getUser({providerId : user.providerId || "", email : user.email, username : user.username}, true);
      if(existedUser &&  existedUser?.params.username === user.username) throw new DBError(`User with username : ${user.username} already exists`);
      if(existedUser &&  existedUser?.params.email === user.email) throw new DBError(`User with email : ${user.email} already exists`);
      if(existedUser && existedUser?.params.providerId === user.providerId) throw new DBError(`User with this provider already exists`);
      let myUser = User.create(user)
      await this.gateway.setUser(myUser);
      return this.outputPort.present(myUser);
    } catch (e) {
      throw e
    }
  }
}

export interface SetUserInputPort extends BaseInteractor<User, Promise<{title : string, message : string}>>{
  readonly outputPort : SetUserOutputPort,
  readonly gateway : UserGateway
  execute(user : User) : Promise<{title : string, message : string}>
}

export interface SetUserOutputPort{
  present(something? : any) : {title : string, message : string}
}

