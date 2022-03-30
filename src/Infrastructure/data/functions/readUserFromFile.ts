//read data from JSON

// path : @/infrastracture/data/files/users
import User from "@/Entities/User";
import {readFile, readFileSync} from "fs";

let path : string = "src/Infrastructure/data/files/users.json";

export async function getSingleUserByUserName (username: string) : Promise<User | undefined>{
  let data = readFileSync(path || "../files/users.json", {encoding : "utf-8"});
  let jsonObject : {[id :string] : User} = JSON.parse(data);
  let user : User | undefined = Object.values(jsonObject).find((user : User) => user.username === username);
  return user
}

export async function getSingleUserById(userId: string) : Promise<User | undefined>{
  try{
    let data = readFileSync(path, {encoding : "utf-8"});
    let jsonObject : {[id :string] : User} = JSON.parse(data);
    let user : User | undefined = jsonObject[userId]
    return user;
  } catch (e){
    throw e
  }
}

/**
 * @param criteria [User key] is an optional param to filter users 
 * @param value [User Value] - is an optional param to filter users
 *  */ 
export async function getUsersList(criteria? : string, value? : string) : Promise<User[] | undefined>{
  if((criteria && !value) || (!criteria && value)) {
    console.warn("both criteria and value should be defined");
    criteria = undefined;
    value = undefined
  }
  let user : User[] | undefined;
  readFile("../files/users.json", async (err, data)=>{
    let jsonObject : {[id :string] : User} = JSON.parse(data.toString());
    user = Object.values(jsonObject).filter((user : User) => user[criteria as keyof User] === value);
  })

  return user!
}