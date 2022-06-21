import { userParams } from "@/common/userParams";
import { GetUserInputPort } from "@/interactors/getUser.interactor";
import { UserVM } from "@/viewmodels/userVM";

export default class GetUserController{
  inputPort : GetUserInputPort;

  constructor(inputPort : GetUserInputPort){
    this.inputPort = inputPort
  }

  async execute(params: userParams) : Promise<UserVM>{
    return await this.inputPort.execute(params);
  }
}