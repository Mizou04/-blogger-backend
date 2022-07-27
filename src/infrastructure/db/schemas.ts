import { BlogPost } from "@/Entities/BlogPost";
import User from "@/Entities/User"
import { createHash } from "crypto";
import {Schema} from "mongoose"


export const UserSchema = new Schema<User>({
  id : {
    type : String, 
    required : true
  },
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
  name : {
    type : String, 
    required : true
  },
  username : {
    type : String, 
    required : true
  },
  profilePic : {
    type : String,
    required : true
  },
  coverPic : {
    type : String,
    required : true
  },
  joinedAt : {
    type : Date,
    required : true
  },
  lastModified : {
    type : Date,
    required : true
  }
})

export const PostSchema = new Schema<BlogPost>({
  id : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true,
    maxlength : 80
  },
  thumbnail: {
    type : String,
    required : true, 
  },
  content : {
    type : String,
    required : true, 
  },
  overview : {
    type : String,
    required : true,
    maxlength : 120
  },
  createdAt : {
    type : Date,
    required : true,
  }
  ,
  lastModified : {
    type : Date,
    required : true,
  },
  owner : {
    type : {
          profilePic : String,
          username : String,
          id : String,
          email : String
        },
    required : true,
  }

})

// UserSchema.pre("save", function(next){
//   let user = this;
//   if(this.isNew){
//     return null
//   } else {
//     throw new Error("user already exists")
//   };

// }) Omit<UserVM, "providerId" | "lastModified" | "joinedAt" | "name">