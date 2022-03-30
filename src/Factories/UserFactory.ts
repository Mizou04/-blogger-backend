import GetUSerByIdController from "@/controllers/GetUserController";
import SetUSerController from "@/controllers/SetUserController";
import GetUserGateway from "@/Gateways/UserGateway";
import IUserGateway from "@/Interactors/common/IUserGateway";
import GetUserInteractor from "@/Interactors/GetUserInteractor";
import SetUserInteractor from "@/Interactors/SetUserInteractor";

let userGateway : IUserGateway = new GetUserGateway();

export default class UserControllersFactory{
  
  static makeGetUserByIdController(){
    let getUserInteractor = new GetUserInteractor(userGateway)
    let userController = new GetUSerByIdController(getUserInteractor);
    return userController;
  }

  static makeSetUserController(){
    let setUserInteractor = new SetUserInteractor(userGateway);
    let userController = new SetUSerController(setUserInteractor);
    return userController;
  }
}