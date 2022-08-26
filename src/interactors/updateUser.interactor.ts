import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import { UserGateway } from "./_common/db.gateway";


export default class UpdateUser implements UpdateUserInputPort {
  constructor(
    public outputport: UpdateUserOutputPort,
    public gateway: UserGateway
  )
  {
    this.gateway = gateway;
    this.outputport = outputport;
  }

  
  async execute(params: userParams, newUserInfos: User) : Promise<any> {
    try {
      await this.gateway.updateUser(params, newUserInfos);
      return this.outputport.present();
    } catch (error) {
      throw error;
    }
  }

}

export interface UpdateUserInputPort{
  outputport : UpdateUserOutputPort;
  gateway : UserGateway;
  execute(params : userParams , newUserInfos : Partial<User>) : Promise<any>;
}

export interface UpdateUserOutputPort{
  present() : any
}
