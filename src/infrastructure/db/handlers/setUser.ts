import User from "@/Entities/User";
import { UserModel } from "../models";



export default async function setUser(user : User) : Promise<null>{
  try {
    let u = new UserModel(user);
    let data = await u.save();
    if(data.isNew){
      return null
    } else {
      throw new Error("user already exists")
    };
  } catch (e) {
    throw e
  }
}