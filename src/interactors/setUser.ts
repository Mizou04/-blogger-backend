import {IUseCaseInputPort} from "../common/IUsecaseInputPort"
import { IMessage } from "../common/IMessage";
import { IUseCaseoutputPort } from "../common/IUsecaseOutputPort";
import IUserGateway from "../common/IUserGateway";
import { User } from "../Entities/User";
import { UserVM } from "../viewmodels/userVM";

export class SetUser implements SetUserInputport{
  gateway: IUserGateway; 
  outputPort: SetUserPresenter;

  constructor(gateway: IUserGateway, outputPort: SetUserPresenter){
    this.gateway = gateway;
    this.outputPort = outputPort
  }
  async execute(params: User): Promise<IMessage> {
    let msg : IMessage;
    try{
      msg = this.outputPort.present(await this.gateway.setUser(params));
    } catch(e){
      msg = this.outputPort.showError(e as Error)
    }
    return msg
  }
}


export interface SetUserInputport extends IUseCaseInputPort<User, Promise<IMessage>, IUserGateway>{}

export class SetUserPresenter implements IUseCaseoutputPort<IMessage, IMessage>{
  showError(e: Error): IMessage {
    return {status : "Failure", title : e.name, message : e.message}
  }
  present(input: IMessage): IMessage {
    return input
  }
}