import User from "@/Entities/User";
import { SetUserInputPort } from "@/interactors/setUser.interactor";

export default class SetUserController{
  inputPort : SetUserInputPort;
  constructor(inputPort : SetUserInputPort){
    this.inputPort = inputPort
  }
  async execute(user : User){
    try{
      return await this.inputPort.execute(user)
    } catch (e){
      throw e
    }
  }
}