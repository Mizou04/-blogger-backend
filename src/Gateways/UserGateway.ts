import User from "../Entities/User";
import IUserGateway from "../Interactors/common/IUserGateway";
import { readFile, readFileSync } from "fs";
import IUserViewModel from "@/ViewModels/IUserViewModel";
import Api404Error from "@/Infrastructure/Server/middlewares/errors/error404";

export default class GetUserGateway implements IUserGateway{
  async getUserById(id : string){
    try{
      let response : User = JSON.parse(readFileSync("src/files/users.json", {encoding : "utf-8"}).toString());
      // readFile("src/files/users.json", (err, data)=>{
      //   if(err) throw err
      //   response = JSON.parse(data.toString());
      //   console.log(response)  
      // })
      if(!response.id) throw new Api404Error(`user with id:${id} not found :(`)
      return response
    } catch(e){
      throw e
    }
  }

  async setUser(payload: User): Promise<void> {
    try {
      let user = User.create(payload);
      if(!user) throw new Error(`no data to submit`)
    } catch (error) {
      console.trace(error)
    }  
  }


  async updateUser(payload: User): Promise<void> {
    
  }
  async deleteUser(id: string): Promise<void> {
    
  }
}