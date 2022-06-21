import User from "@/Entities/User";

export class UserVM{
  readonly id? : string;
  readonly providerId? : string;
  readonly username : string;
  readonly email : string;
  readonly joinedAt? : string;
  readonly lastModified? : string;
  constructor(user : User){
    this.id = user.id;
    this.providerId = user.providerId;
    this.username = user.username;
    this.email = user.email;
    this.joinedAt = user.joinedAt?.toString();
    this.lastModified = user.lastModified?.toString();
  }
}

