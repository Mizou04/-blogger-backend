import User from "@/Entities/User";

// export interface UserResponseDTO extends Omit<User, "password" | "name">{
//   blogposts : []
// }

export class UserResponseDTO{
  constructor(public params : Omit<User, "password" | "name">){
    this.params = params;
  }
} 

export class UserMinResponseDTO{
  constructor(public id?: string, public email?: string, public username?: string, public profilePic?: string){
    this.id = id;
    this.email = email;
    this.username = username;
    this.profilePic = profilePic;
  }
} 