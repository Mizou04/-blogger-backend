import validator from "validator"
import {v4} from "uuid"
import { InvalidInputError } from "@/common/customErrors";
import { userParams } from "@/common/userParams";

export default class User{
  readonly id? : string;
  readonly providerId? : string; // if Email exists the user would be registred with Email not [social media]
  username : string;
  name : string;
  email : string; 
  password? : string;
  readonly joinedAt?: Date;
  lastModified?: Date;
  private constructor(params : User){
    this.providerId = params.providerId; 
    this.username = params.username;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.id = params.id || v4().replace(/-/igm, ""); 
    this.joinedAt =  new Date();
    this.lastModified =  new Date();
  }
  
  static create(params: User): User {
    if(params.password && params.password.length < 6) throw new InvalidInputError("too short password");
    if(params.username && params.username.length < 4) throw new InvalidInputError("too short username");
    if(params.name && params.name.length < 4) throw new InvalidInputError("too short name");
    if(validator.isEmail(params.email as string) == false) throw new InvalidInputError('invalid email');
    if(!params.email && !params.providerId) throw new InvalidInputError("user must have email or connect with provider");
    if(params.providerId && params.password) throw new InvalidInputError("cannot connect with provider and the same email");

    let user = new User(params);
    return user  
  }

}