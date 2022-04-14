import {IUseCaseInputPort} from "../common/IUsecaseInputPort"
import { IMessage } from "../common/IMessage";
import { IUseCaseoutputPort } from "../common/IUsecaseOutputPort";
import IUserGateway from "../common/IUserGateway";
import { User } from "../Entities/User";
import { UserVM } from "@/viewmodels/userVM";
import { criteriaFields } from "@/types/types";


export class GetUser implements GetUserInputport{
  gateway: IUserGateway; 
  outputPort: GetUserPresenter;


  constructor(gateway: IUserGateway, outputPort: GetUserPresenter){
    this.gateway = gateway;
    this.outputPort = outputPort
  }
  async execute(params: {criteria: criteriaFields, value : User[criteriaFields]}): Promise<UserVM | IMessage>{
    let user : User | IMessage;
    try{
      user = await this.gateway.getUserByCriteria(params);
      if(user !instanceof User){
        throw new Error("User Not Found")
      }
    }
    catch(e){
      user = {title : (e as Error).name, message : (e as Error).message, status : "Failure"} as IMessage
    }
    return user
  }
}


export interface GetUserInputport extends IUseCaseInputPort<{criteria: criteriaFields, value : User[keyof User]}, Promise<UserVM | IMessage>, IUserGateway>{}

export class GetUserPresenter implements IUseCaseoutputPort<User, UserVM | IMessage>{
  showError(e: Error): IMessage {
    return {status : "Failure", title : e.name, message : e.message}
  }
  present(input: User | IMessage): UserVM | IMessage{
    if(input instanceof User){
      return {username : input.username, name : input.name, email : input.email, joinedAt : input.joinedAt?.toString() as string, id : input?.id as string, lastModified : input.lastModified?.toString() as string}
    } else {
      return {title : input.title, status : input.status, message : input.message}
    }
  }
}