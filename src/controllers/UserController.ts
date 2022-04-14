import { User } from "@/Entities/User";
import {GetUserInputport} from "@/interactors/getUser"
import { SetUserInputport } from "@/interactors/setUser";
import { criteriaFields } from "@/types/types";

export class GetUserController {
  private inputPort : GetUserInputport
  constructor(inputPort : GetUserInputport){
    this.inputPort = inputPort;
  }

  async onGetUser(params : {criteria: criteriaFields, value : User[criteriaFields]}){
    return (await this.inputPort.execute(params))
  }
}

export class SetUserController {
  private inputPort : SetUserInputport
  constructor(inputPort : SetUserInputport){
    this.inputPort = inputPort;
  }

  async onSetUser(params : User){
    return (await this.inputPort.execute(params))
  }
}