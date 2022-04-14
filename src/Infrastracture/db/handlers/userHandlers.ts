import { IMessage } from "../../../common/IMessage";
import { User } from "../../../Entities/User";
import {readFileSync, writeFileSync} from "fs"
import path from "path";
import { PATH } from "@/PATH";
import { criteriaFields } from "@/types/types";


export function setUserInFile(user : User, path: string = PATH) : IMessage{
  let msg : IMessage;
  try {
    let fileData : string = readFileSync(path, {encoding : "utf-8"});
    let jsonObject : {[key : string ] : User} = JSON.parse(fileData || "{}");
    jsonObject[(user as User).id as string] = user;
    msg = {status : "Success", message : `User ${user.username} Added successfully`, title : "USER STATUS"};
    writeFileSync(path, JSON.stringify(jsonObject, null, 3));
  } catch (e) {
    msg = {title : (e as Error).name, status : "Failure", message : (e as Error).message}
  }
  return msg
}

export function getUserFromFile(params : {criteria: criteriaFields, value : User[criteriaFields]}, path : string = PATH) : User | IMessage{
  let data : User | IMessage;
  try {
    let fileData : string = readFileSync(path, {encoding : "utf-8"});
    let jsonObject : {[key : string ] : User} = JSON.parse(fileData || "{}");
    let searchValue = Object.values(jsonObject).find(user => user[params.criteria] === params.value) as User;
    if(!searchValue){
        throw new Error("No USER FOUND")
    } else {
      data = searchValue;
    }
  } catch (e) {
    data = {title : (e as Error).name, status : "Failure", message : (e as Error).message}
  }
  return data
}