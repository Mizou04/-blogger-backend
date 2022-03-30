import User from "@/Entities/User";
import IUseCaseInputPort from "@/Interactors/common/IUseCaseInputPort";
import IUseCaseOutputPort from "@/Interactors/common/IUseCaseOutputPort";
import IUserGateway from "@/Interactors/common/IUserGateway";

export default class SetUSerController{
  private inputPort : IUseCaseInputPort<User, string, IUserGateway>;

  constructor(inputPort : IUseCaseInputPort<User, string, IUserGateway>){
    this.inputPort = inputPort;
  }

  async onSetUser(params : User) : Promise<string>{
    let data : string;
    try{
      data = await this.inputPort.execute(params);
    } catch(e){
      if(e instanceof SyntaxError) console.error(e);
      data = (e as Error).message;
    }
    return data;
  }

};