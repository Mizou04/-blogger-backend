import User from "@/Entities/User";
import UserControllersFactory from "@/Factories/UserFactory";
import SetUserPresenter from "@/presenters/SetUserPresenter";
import { NextFunction, Request, Response } from "express";
import { userInfo } from "os";

const setUserController = UserControllersFactory.makeSetUserController();
const setUserPresenter = new SetUserPresenter();

export async function setUserMiddleware(req : Request, res : Response, next : NextFunction){
  let user : User;
  try {
    user = req.body;
    if(user.username.length < 5) throw new Error("User username must be Equal or greater than 5 characters")
    if(user.name.length < 5) throw new Error("User name must be Equal or greater than 5 characters")
    let response = setUserPresenter.present(await setUserController.onSetUser(user));
    res.send(response);
  } catch (e) {
    if(e instanceof SyntaxError) console.error(e);
    res.send((e as Error).message)
  }
}