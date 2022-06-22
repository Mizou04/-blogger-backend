import express from "express"
import {userFactory} from "@/factories/User.factory"
import User from "@/Entities/User";
import { DBError, InvalidInputError } from "@/common/customErrors";

let getUser = userFactory.makeGetUser();
let setUser = userFactory.makeSetUser();
let miniApp = express.Router();

miniApp.get('/users/:id', function(req, res, next){
  let {id} = req.params
  getUser.execute({id}).then(user=>{
    res.status(200).json(user)
  }).catch((e)=>{
    let msg = {title : (e as Error).name, message : (e as Error).message}
    if(e instanceof InvalidInputError || e instanceof DBError){
      res.status(404).json(msg);
    } else {
      res.status(500).json(msg);
    }
  })
})

miniApp.post('/users/new', function(req, res, next){
  let body : User = req.body;
  setUser.execute(body).then((v)=>{
    res.json({
      title : "user status",
      message : "user added successfully"
    });
    res.redirect('/login');
  }).catch((e)=>{
    let msg = {title : (e as Error).name, message : (e as Error).message}
    if(e instanceof InvalidInputError || e instanceof DBError){
      res.status(404).json(msg);
    } else {
      res.status(500).json(msg);
    }
  })
})

export default miniApp;