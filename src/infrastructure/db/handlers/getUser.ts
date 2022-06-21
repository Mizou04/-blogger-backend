import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import { UserModel } from "../models";



// function getUser(params : {[key in keyof User] : any}){
//   params.id
// } 
export default async function getUser(params : userParams) : Promise<User>{
  try{
    let user : User | null = await UserModel.findOne(params).exec();
    if(!user) throw new Error("User not found")
    return user;
  } catch (e){
    throw e
  }
}