import Api404Error from "@/Infrastructure/Server/middlewares/errors/error404";
import User from "../Entities/User";
import IUseCaseInputPort from "./common/IUseCaseInputPort";
import IUserGateway from "./common/IUserGateway";

export default class GetUserInteractor implements IUseCaseInputPort<{id : string}, User | undefined, IUserGateway>{
  gateway: IUserGateway;
  constructor(gateway : IUserGateway){
    this.gateway = gateway;
  }
  async execute(params: { id: string; }): Promise<User | undefined> {
    try{
      let user = await this.gateway.getUserById(params.id);
      if(!user){
        new Api404Error(`User with id: ${params.id} not found.`)
      }
      return user;
    } catch(e){
      console.log(e)
    }
  }
}