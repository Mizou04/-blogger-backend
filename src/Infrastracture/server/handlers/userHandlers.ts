import { NextFunction, Request, Response } from "express";
import UserControllersFactory from "@/Factories/UserControllersFactory";
import { User } from "@/Entities/User";
import { IMessage } from "@/common/IMessage";
import { UserVM } from "@/viewmodels/userVM";

let getUserController = UserControllersFactory.makeGetUserByCriteria();
let setUserController = UserControllersFactory.makeSetUserByCriteria();

export async function getUserById (req : Request, res : Response, next : NextFunction){
  let {id} = req.params;
  try {
    let userOrMsg : UserVM | IMessage = await getUserController.onGetUser({criteria: "id", value : id});
    if((userOrMsg as IMessage).status === "Failure" ){
      res.status(404).json(userOrMsg)
    }
    res.status(200).json(userOrMsg);
    
  } catch (error) {
    res.status(500).json("SERVER ERROR")
  }
  next()
}
export async function setUser (req : Request, res : Response, next : NextFunction){
  console.log(req.body)
  try{
    let msg = await setUserController.onSetUser(req.body);
    if(msg.status === "Failure"){
      res.status(404).json(msg)
    } else {
      res.status(200).json(msg)
    }
  } catch (e){
    res.status(500).json("SERVER ERROR")
  }
  next()
}