import { BaseInteractor } from "@/interactors/_common/BaseInteractor";
import { GetUserInputPort } from "@/interactors/getUser.interactor";
import { BaseController } from "../common/BaseController";

export class GetUserController extends BaseController{
  constructor(public inputPort : GetUserInputPort){
    super();
    this.inputPort = inputPort;  
  }
  async executeImpl() {
    let {id} = this.req.params;
    try {
      this.res.json(await this.inputPort.execute({userParams : {id : id}, complete : true}));
    } catch (error) {
      throw error
    }
  }
}

