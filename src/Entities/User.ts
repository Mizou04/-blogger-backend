import {v4 as uuid4} from "uuid"
import validator from "validator"

export class User {
  readonly id : string;
  username : string;
  name : string;
  readonly providerID : string;
  profilePic : string;
  email : string;
  password : string;
  readonly joinedAt : Date;
  readonly lastModified : Date;


  private constructor(params : User){
    this.username =   params.username;
    this.name =   params.name;
    this.providerID =   params.providerID;
    this.profilePic =   params.profilePic;
    this.email =   params.email;
    this.password =   params.password;
    this.id =   params.id;
    this.joinedAt =   params.joinedAt;
    this.lastModified =   params.lastModified;
  }

  static create(params : User) : User{
    if((params.password as string).length < 6) throw new Error("Password is less than 6 characters long");
    if(params.username.length < 6) throw new Error("Username is less than 6 characters long");
    if(!validator.isEmail(params.email)) throw new Error("Email not valid");
    return new User({...params, id : uuid4().toString().replace(/-/ig, ""), joinedAt : new Date(), lastModified : new Date()})
  }

}

