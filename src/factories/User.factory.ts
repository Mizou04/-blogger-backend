import GetUserController from "@/controllers/getUser.controller";
import SetUserController from "@/controllers/setUser.controller";
import GetUser from "@/interactors/getUser.interactor";
import SetUser, { SetUserOutputPort } from "@/interactors/setUser.interactor";
import GetUserPresenter from "@/presenters/getUser.presenter";
import UserRepository from "@/repositories/User.repository";

let gateway = new UserRepository();

class UserFactory{
  makeGetUser(){
    let presenter = new GetUserPresenter();
    let interactor = new GetUser(presenter, gateway)
    let controller = new GetUserController(interactor)
    return controller
  }
  makeSetUser(){
    let presenter : SetUserOutputPort = {present(something?) {
      return null
    },};
    let interactor = new SetUser(presenter, gateway)
    let controller = new SetUserController(interactor)
    return controller
  }
}


export let userFactory = new UserFactory();