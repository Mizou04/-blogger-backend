import { DBError } from "@/common/customErrors";
import { UserResponseDTO, UserMinResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { userDTOSample, userMinDTOSample } from "@/common/projections";
import { Range } from "@/common/Range";
import { userParams } from "@/common/userParams";
import User from "@/Entities/User";
import { projectionFromArray } from "@/helpers/mongoDB.helpers";
import { UserModel } from "@/infrastructure/db/models";
import { UserGateway } from "@/interactors/_common/db.gateway";



let userDTOKeys = Object.keys(userDTOSample.params);
let userMinDTOKeys = Object.keys(userMinDTOSample);

class UserRepository implements UserGateway{
  async getUsersCount(filter?: any): Promise<number> {
    try {
      let count = await UserModel.find(filter).count();
      return count;
    } catch (e) {
      throw new DBError((e as Error).message);
    }
  }
  async getUser<T = boolean>(params: userParams, complete: T): Promise<UserResponseDTO | UserMinResponseDTO> {
    let projections = complete ? projectionFromArray(userDTOKeys) : projectionFromArray(userMinDTOKeys);
    try {
      /**transform an object to array of objects containing (key:value)s of original object */
      let query : {}[] = [];
      let ens = Object.entries(params);
      ens.map(e => query.push({[e[0]] : e[1]}));
      let user : UserResponseDTO | UserMinResponseDTO | null = await UserModel.findOne({$or : query}, projections);
      if(!user) throw new DBError("user not found");
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getUsers(sizeOrRange?: number | Range | undefined, criteria?: userParams, filter?: any): Promise<UserMinResponseDTO[]> {
    try {
      let query : {}[] = [];
      let ens = Object.entries(criteria as userParams);
      ens.map(e => query.push({[e[0]] : e[1]}));
      let data : UserMinResponseDTO[];
      let projections = projectionFromArray(userMinDTOKeys);
      if(typeof sizeOrRange == "number"){
        data = await UserModel.find(criteria ? {$or : query} : {}, projections).limit(sizeOrRange);
      } else if (sizeOrRange instanceof Range){
        data = await UserModel.find(criteria ? {$or : query} : {}, projections).skip(sizeOrRange.from - 1).limit(sizeOrRange.to - sizeOrRange.from + 1)
      } else {
        data = await UserModel.find(criteria ? {$or : query} : {}, projections);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
  async setUser(params: User): Promise<null> {
    try {
      let u = new UserModel(params);
      let data = await u.save();
      if(data) {
        return null
      }
      else {
        throw new Error("can't store user")
      }
    } catch (e) {
      throw e
    }
  }
  updateUser(params: userParams, newUserData: User): Promise<null> {
    throw new Error("Method not implemented.");
  }
  deleteUser(params: userParams): Promise<null> {
    throw new Error("Method not implemented.");
  }
}

let userRepository = new UserRepository();

export default userRepository;

// class UserRepository implements UserGateway{


//   async getUser(params: userParams): Promise<UserQueryDTO | null> {
//     let projections = projectionFromArray(userDTOKeys);
//     try {
//       /**transform an object to array of objects containing (key:value)s of original object */
//       let query : {}[] = [];
//       let ens = Object.entries(params);
//       ens.map(e => query.push({[e[0]] : e[1]}));
//       let user = await UserModel.findOne({$or : query}, projections).exec();
//       return user;
//     } catch (e) {
//       throw new DBError((e as Error).message);
//     }
//   }

//   async setUser(params : User) : Promise<null>{
//     try {
//       let u = new UserModel(params);
//       let data = await u.save();
//       if(data) {
//         return null
//       }
//       else {
//         throw new DBError("can't create user")
//       }
//     } catch (e) {
//       throw e
//     }
//   }

//   async deleteUser(params: userParams): Promise<null> {
//     try {
//       let query : {}[] = [];
//       let ens = Object.entries(params);
//       ens.map(e => query.push({[e[0]] : e[1]}));
//       await UserModel.remove({$or : query});
      
//       return null;
//     } catch (error) {
//       throw new DBError((error as Error).message)
//     }
//   }

//   async updateUser(params: userParams, newUserData: User): Promise<null> {
//     try {
//       let query : {}[] = [];
//       let ens = Object.entries(params);
//       ens.map(e => query.push({[e[0]] : e[1]}));
//       await UserModel.findOneAndUpdate({$or : query}, newUserData);
      
//       return null;
//     } catch (error) {
//       throw new DBError((error as Error).message)
//     }
//     return Promise.resolve(null);
//   }

// }

// export default class UserRepository implements UserGateway{
//   /** 
//    * get user that have one of the criterias in the params
//    * @param params an object with different criterias & the funcion use one of them to check for the user
//    */
//   async getUser(params : userParams) : Promise<User | null>{
//     try{
//       /**transform an object to array of objects containing (key:value)s of original object */
//       let query : {}[] = [];
//       let ens = Object.entries(params);
//       ens.map(e => query.push({[e[0]] : e[1]}));
//       let user = await UserModel.findOne({$or : query}, ).exec();
//       return user;
//     } catch (e){
//       throw e
//     }
//   }
//   async getUsers<T>(params?: T | undefined, projection?: string | undefined, filter?: any): Promise<User[] | null> {
//     return Promise.resolve()
//   }
//   async setUser(params : User) : Promise<null>{
//     try {
//       let u = new UserModel(params);
//       let data = await u.save();
//       if(data) {
//         return null
//       }
//       else {
//         throw new DBError("can't create user")
//       }
//     } catch (e) {
//       throw e
//     }
//   }
//   updateUser(params : userParams, newUserData : User) : Promise<null>{
//     return Promise.resolve(null)

//   }
//   deleteUser(params : userParams) : Promise<null>{
//     return Promise.resolve(null)

//   }
// }