import User from "@/Entities/User";
import { SetUserInputPort } from "@/interactors/setUser.interactor";
import { BaseController } from "../common/BaseController";


export default class SetUserController extends BaseController{
  constructor(public inputPort : SetUserInputPort){
    super();
    this.inputPort = inputPort;
  }


  async executeImpl() {
    let user : User = this.req.body;
    try{
      this.res.json(this.inputPort.execute(user));
    }catch(e){
      throw e;
    }
  }
}