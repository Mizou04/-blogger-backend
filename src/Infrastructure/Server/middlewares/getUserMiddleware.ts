import UserControllersFactory from "@/Factories/UserFactory";
import GetUserPresenter from "@/presenters/GetUserPresenter";
import {Request, Response, NextFunction} from "express"


let userController = UserControllersFactory.makeGetUserController();

export default async function getUserMiddleware(req : Request<{id : string, name : string}>, res : Response, next : NextFunction){
  let data = await userController.onGetUser(req.params, new GetUserPresenter());
  try{
    console.log("from getUserMiddleware.ts : "+ JSON.stringify(data));
    req.params.name = "hamzza";
    res.status(200).json(data);
  } catch(e){
    next(e)
    res.status(500).json(e);
  }
    
  // next();
}