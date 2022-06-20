import GetUserController from "@/controllers/getUser.controller";
import { UserRepository } from "@/repositories/User.repository";
import GetUser from "@/interactors/getUser.interactor";
import GetUserPresenter from "@/presenters/getUser.presenter";

class UserFactory{
  makeGetUser(){
    let presenter = new GetUserPresenter();
    let gateway = new UserRepository();
    let interactor = new GetUser(presenter, gateway)
    let controller = new GetUserController(interactor)
    return controller
  }
}


export let userFactory = new UserFactory();