import User from "../Entities/User";
import IUserGateway from "../Interactors/common/IUserGateway";
import { readFile, readFileSync } from "fs";
import IUserViewModel from "@/ViewModels/IUserViewModel";
import Api404Error from "@/Infrastructure/Server/middlewares/errors/error404";
import { getSingleUserById, getSingleUserByUserName } from "@/Infrastructure/data/functions/readUserFromFile";
import createUserInFile from "@/Infrastructure/data/functions/createUserInFile";

export default class GetUserGateway implements IUserGateway{
  async getUserById(id : string){
    try{
      let response : User | undefined = await getSingleUserById(id);
      if(!response?.id) throw new Api404Error(`user with id: ${id} not found :(`)
      return response
    } catch(e){
      throw e
    }
  }

  async getUserByName(username: string): Promise<User | undefined> {
    try{
      let response : User | undefined = await getSingleUserByUserName(username);
      if(!response?.username) throw new Api404Error(`user with id:${username} not found :(`)
      return response
    } catch(e){
      throw e
    }
  }

  async setUser(payload: User): Promise<string> {
    let message : string;
    try{
      message = await createUserInFile(undefined, payload);
    } 
    catch(e){
      console.error(e);
      message = (e as Error).message
    }
    return message
  }


  async updateUser(payload: User): Promise<string> {
    return "false"
  }
  async deleteUser(id: string): Promise<string> {
    return "false"
  }
}