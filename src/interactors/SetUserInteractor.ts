import User from "@/Entities/User";
import IUseCaseInputPort from "./common/IUseCaseInputPort";
import IUserGateway from "./common/IUserGateway";

export default class SetUserInteractor implements IUseCaseInputPort<User, void, IUserGateway>{
  gateway: IUserGateway;
  constructor(gateway : IUserGateway){
    this.gateway = gateway;
  }
  
  async execute(options: User): Promise<void> {
    let payload = User.create(options);
    if(!payload) throw new Error(payload);
    return await this.gateway.setUser(payload);
  }
}
