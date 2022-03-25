import User from "../../Entities/User";

export default interface IUserGateway{
  getUserById(id : string) : Promise<User | undefined>;
  setUser(payload : User) : Promise<void>;
  updateUser(payload : User) : Promise<void>,
  deleteUser(id : string) : Promise<void> 
}