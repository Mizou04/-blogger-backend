import User from "@/Entities/User";
import { readFile, readFileSync, writeFile } from "fs";

type IMessage = "Success" | "User username Exists" | "User email Exists"

const PATH : string = "src/Infrastructure/data/files/users.json";

export default async function createUserInFile(path :string = PATH, payload : User) : Promise<string>{
  let message : string;
  let fileContent : string;
  try{
    fileContent = readFileSync(path, {encoding : "utf-8"});
    let jsonAsObject : {[key : string] : User} = await JSON.parse(fileContent || "{}");
    Object.values(jsonAsObject).some(u=>{
      // try{
        if(u.username === payload.username){
          throw new Error("user Username exists already!!")
          // message = "user Username exists already!!";
          // return message
        }
      // } catch(e){
      //   throw e
      // }
      // try{
        if(u.email === payload.email){
          throw new Error("user Email exists already!!")
          // message = "user Email exists already!!";
          // return message
        }
      // } catch(e){
      //   throw e
      // }
    })
      jsonAsObject[payload.id] = payload;
        
      writeFile(path, JSON.stringify(jsonAsObject, null, 3), (err)=>{
        if(err) throw err;
      });
      message = `user ${payload.username} added successfully`; 
  } catch(e){
    if(e instanceof SyntaxError) console.error(e);
    message = (e as Error).message
  }

  return message!
}