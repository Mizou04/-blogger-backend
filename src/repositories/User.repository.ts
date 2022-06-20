import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import { UserGateway } from "@/interactors/getUser.interactor";
let user : User = {id : "123456789", name: "hamza", username : "hamza", password : "123455",  email : "ha@gmail.com"};

export default class UserRepository implements UserGateway{
  getUser(params : userParams) : Promise<User | null>{
    return Promise.resolve(user)
  }
  setUser(params : User) : Promise<null>{
    return Promise.resolve(null)
    
  }
  updateUser(params : userParams, newUserData : User) : Promise<null>{
    return Promise.resolve(null)

  }
  deleteUser(params : userParams) : Promise<null>{
    return Promise.resolve(null)

  }
}