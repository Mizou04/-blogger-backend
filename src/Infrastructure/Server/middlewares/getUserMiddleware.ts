import User from "@/Entities/User";
import UserControllersFactory from "@/Factories/UserFactory";
import GetUserPresenter from "@/presenters/GetUserPresenter";
import IUserViewModel from "@/ViewModels/IUserViewModel";
import {Request, Response, NextFunction, RequestParamHandler} from "express"



let getUserByIdController = UserControllersFactory.makeGetUserByIdController();
let presenter = new GetUserPresenter();

export default async function getUserByIdMiddleware(req : Request, res : Response, next : NextFunction){
  try{
  let {id} = req.params;
  let data = await getUserByIdController.onGetUser({id : id as string});
    res.status(200).json(presenter.present(data as User));
  } catch(e){
    next(e)
    res.status(500).json(e);
  }
  next();
}