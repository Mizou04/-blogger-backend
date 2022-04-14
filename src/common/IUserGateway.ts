import { criteriaFields } from "@/types/types";
import { UserVM } from "@/viewmodels/userVM";
import { User } from "../Entities/User";
import {IMessage} from "./IMessage"

export default interface IUserGateway{
  // getUserById(id : string) : Promise<User | IMessage>
  // getUserByProviderId(id : string) : Promise<User | IMessage>
  getUserByCriteria(params : {criteria: criteriaFields, value : User[criteriaFields]}) : Promise<User | IMessage>
  setUser(user : User) : Promise<IMessage>
  getUsers(qty : number) : Promise<User[]>
}