import User from "@/Entities/User";
import IUseCaseInputPort from "@/Interactors/common/IUseCaseInputPort";
import IUseCaseOutputPort from "@/Interactors/common/IUseCaseOutputPort";
import IUserGateway from "@/Interactors/common/IUserGateway";
import GetUserInteractor from "@/Interactors/GetUserInteractor";
import IUserViewModel from "@/ViewModels/IUserViewModel";

export default class GetUSerController{
  inputPort : IUseCaseInputPort<{id : string}, User | undefined, IUserGateway>;
  constructor(inputPort : IUseCaseInputPort<{id : string}, User | undefined, IUserGateway>){
    this.inputPort = inputPort;
  }
  async onGetUser(params : {id : string} ,outPutPort : IUseCaseOutputPort<User | undefined,IUserViewModel>){
    try{
      let user = this.inputPort.execute(params);
      return outPutPort.present(await user);
    } catch(e){
      console.log(e)
    }
  }
};