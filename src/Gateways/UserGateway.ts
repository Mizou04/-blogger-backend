import { criteriaFields } from "@/types/types";
import { IMessage } from "../common/IMessage";
import IUserGateway from "../common/IUserGateway";
import { User } from "../Entities/User";
import { getUserFromFile, setUserInFile } from "../Infrastracture/db/handlers/userHandlers";

export default class UserGateway implements IUserGateway{
  async getUserByCriteria(params : {criteria: criteriaFields, value : User[criteriaFields]}): Promise<User | IMessage> {
    return getUserFromFile(params)
  }

  async getUsers(qty: number): Promise<User[]> {
    return []
  }
  async setUser(user: User): Promise<IMessage> {
    return setUserInFile(User.create(user))
  }
}