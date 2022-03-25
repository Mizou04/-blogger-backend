import User from "@/Entities/User";
import IUseCaseInputPort from "@/Interactors/common/IUseCaseInputPort";
import IUseCaseOutputPort from "@/Interactors/common/IUseCaseOutputPort";
import IUserGateway from "@/Interactors/common/IUserGateway";

export default class SetUSerController{
  inputPort : IUseCaseInputPort<User, void, IUserGateway>;
  constructor(inputPort : IUseCaseInputPort<User, void, IUserGateway>){
    this.inputPort = inputPort;
  }

  async onSetUser(params : User,outputPort : IUseCaseOutputPort<void, {notification : string}>) : Promise<void>{
    this.inputPort.execute(params);
    outputPort.present();
  }

};