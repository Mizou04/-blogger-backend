import validator from "validator"
import {v4} from "uuid"

export default class User{
  readonly id : string = v4().replace("-", "");
  readonly providerId : string = ""; // if Email exists the user would be registred with Email not [social media]
  username : string;
  name : string;
  readonly email : string = "";  // if Email exists the user would be registred with Email not [social media]
  password? : string;
  readonly joinedAt: Date = new Date();
  readonly lastModified: Date = new Date();
  private constructor(params : User){
    this.providerId = params.providerId; 
    this.username = params.username;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password
  }
  
  static create(params: User): User {
    if(params.password && params.password.length < 6) throw new Error("too short password");
    if(params.username && params.username.length < 4) throw new Error("too short username");
    if(params.name && params.name.length < 4) throw new Error("too short name");
    if(validator.isEmail(params.email) == false) throw new Error('invalid email');
    if(!params.email && !params.providerId) throw new Error("user must have email or connect with provider")
    let user = new User(params); 
    return user  
  }
}