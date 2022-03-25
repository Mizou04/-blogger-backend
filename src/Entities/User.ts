import { randomUUID } from "crypto";
import {v4} from "uuid"

export default class User{
  name : string;
  email : string;
  id : string;
  joinedAt : string;

  private constructor(options : {name : string, email : string, id : string, joinedAt : string}){
    this.name = options.name;
    this.email = options.email;
    this.id = options.id;
    this.joinedAt = options.name;
  }

  static create(options : {name : string, email : string, id : string, joinedAt : string}) : User{
    if(options.name.trim().length < 5) throw new Error("username must be greated than 5 characters long");
    if(emailValidator.test(options.email.trim())) throw new Error("user Email is not valid");
    options = {...options, id : v4()};
    return new User(options);
  }
  
}


let emailValidator = /^\w[/*$&é"'(-è_çà)=][^\s]{4, 25}\.\w+\.(com|net|fr|ma)$/igm;