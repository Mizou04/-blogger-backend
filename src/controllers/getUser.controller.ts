import { GetUserInputPort } from "@/interactors/getUser.interactor";
import { UserVM } from "@/viewmodels/userVM";

export default class GetUserController{
  inputPort : GetUserInputPort;

  constructor(inputPort : GetUserInputPort){
    this.inputPort = inputPort
  }

  async execute(params: { criteria: "id" | "username"; value: string | undefined; }) : Promise<UserVM>{
    return await this.inputPort.execute(params);
  }
}