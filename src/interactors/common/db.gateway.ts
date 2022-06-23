import { userParams } from "@/common/userParams";
import User from "@/Entities/User";

export interface UserGateway{
  getUser(params : userParams) : Promise<User | null>,
  setUser(params :  Omit<User, "id" | "joinedAt" | "lastModified">) : Promise<null>,
  updateUser(params : userParams, newUserData : User) : Promise<null>,
  deleteUser(params : userParams) : Promise<null>,
}

export interface BlogGateway{}