import User from "@/Entities/User"
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
