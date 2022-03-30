import { randomUUID } from "crypto";
import {v4} from "uuid"

export default class User{
  name : string;
  username : string;
  email : string;
  id : string;
  joinedAt : string;

  private constructor(options : {name : string, username : string, email : string, id : string, joinedAt : string}){
    this.name = options.name;
    this.username = options.username;
    this.email = options.email;
    this.id = options.id;
    this.joinedAt = options.joinedAt;
  }

  static create(options : {name : string, username : string, email : string, id : string, joinedAt : string}) : User{
    try{
      if(options.name.trim().length < 5) throw new Error("user name must be greater than or equal 5 characters long");
      if(options.username.trim().length < 5) throw new Error("user name must be greater than or equal 5 characters long");
      if(!emailValidator.test(options.email.trim())) throw new Error("user Email is not valid");
      options = {...options, id : v4().replace(/\-/igm, ""), joinedAt : Date.now().toString()};
    } catch(e){
      if(e instanceof SyntaxError) console.error(e);
      throw e;
    }
    return new User(options);
  }
  
}


let emailValidator = /^\w+@\w+\.(com|ma|net|fr)$/igm;