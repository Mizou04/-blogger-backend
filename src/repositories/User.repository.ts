import { DBError } from "@/common/customErrors";
import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import { UserModel } from "@/infrastructure/db/models";
import { UserGateway } from "@/interactors/common/db.gateway";

export default class UserRepository implements UserGateway{
  /** 
   * get user that have one of the criterias in the params
   * @param params an object with different criterias & the funcion use one of them to check for the user
   */
  async getUser(params : userParams) : Promise<User | null>{
    try{
      /**transform an object to array of objects containing (key:value)s of original object */
      let query : {}[] = [];
      let ens = Object.entries(params);
      ens.map(e => query.push({[e[0]] : e[1]}));
      let user = await UserModel.findOne({$or : query}).exec();
      return user;
    } catch (e){
      throw e
    }
  }
  async setUser(params : User) : Promise<null>{
    try {
      let u = new UserModel(params);
      let data = await u.save();
      if(data) {
        return null
      }
      else {
        throw new DBError("can't create user")
      }
    } catch (e) {
      throw e
    }
  }
  updateUser(params : userParams, newUserData : User) : Promise<null>{
    return Promise.resolve(null)

  }
  deleteUser(params : userParams) : Promise<null>{
    return Promise.resolve(null)

  }
}