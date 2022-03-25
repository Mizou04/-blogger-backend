import SetUSerController from "@/controllers/SetUserController";
import SetUserInteractor from "@/Interactors/SetUserInteractor";
import GetUSerController from "../controllers/GetUserController";
import GetUserGateway from "../Gateways/UserGateway";
import IUserGateway from "../Interactors/common/IUserGateway";

import GetUserInteractor from "../Interactors/GetUserInteractor";

let userGateway : IUserGateway = new GetUserGateway();

export default class UserControllersFactory{
  
  static makeGetUserController(){
    let getUserInteractor = new GetUserInteractor(userGateway)
    let userController = new GetUSerController(getUserInteractor);
    return userController;
  }

  static makeSetUserController(){
    let setUserInteractor = new SetUserInteractor(userGateway);
    let userController = new SetUSerController(setUserInteractor);
    return userController;
  }
}