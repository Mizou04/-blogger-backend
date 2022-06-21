import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import getUser from "@/infrastructure/db/handlers/getUser";
import { UserModel } from "@/infrastructure/db/models";
import { UserSchema } from "@/infrastructure/db/schemas";
import { UserGateway } from "@/interactors/common/db.gateway";

export default class UserRepository implements UserGateway{
  async getUser(params : userParams) : Promise<User | null>{
    try{
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
      if(data.isNew){
        return null
      } else {
        throw new Error("user already exists")
      };
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