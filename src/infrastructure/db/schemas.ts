import User from "@/Entities/User"
import { createHash } from "crypto";
import {Schema} from "mongoose"


export let UserSchema = new Schema<User>({
  id : String,
  providerId : {
    type : String,
    required : false,
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : false
  },
  name : String,
  username : String,
  joinedAt : Date,
  lastModified : Date
})

// UserSchema.pre("save", function(next){
//   let user = this;
//   if(this.isNew){
//     return null
//   } else {
//     throw new Error("user already exists")
//   };

// })