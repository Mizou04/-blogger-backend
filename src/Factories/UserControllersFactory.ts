import {GetUser, GetUserPresenter} from "@/interactors/getUser"
import {SetUser, SetUserPresenter} from "@/interactors/setUser"
import UserGateway from "@/Gateways/UserGateway"
import { GetUserController, SetUserController } from "@/controllers/UserController"

export default class UserControllersFactory{
  static makeGetUserByCriteria(){
    return new GetUserController(new GetUser(new UserGateway(), new GetUserPresenter()));
  }
  static makeSetUserByCriteria(){
    return new SetUserController(new SetUser(new UserGateway(), new SetUserPresenter()));
  }
}