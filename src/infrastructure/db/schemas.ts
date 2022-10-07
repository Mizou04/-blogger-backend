import BlogPost from "@/Entities/BlogPost";
import Comment from "@/Entities/Comment";
import User from "@/Entities/User";
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
    required : false
  },
  coverPic : {
    type : String,
    required : false
  },
  joinedAt : {
    type : Date,
    required : true
  },
  lastModified : {
    type : Date,
    required : true
  },
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
  ownerId : {
    type : String,
    required : true,
  },
  likes : {
    type : Set,
    of : String
  },

})

export const CommentsSchema = new Schema<{postId : string, data : Comment[]}>({
  postId : {type : String, required : true},
  data : {
    type : [],
    of : {    
      id : String,
      postId : String,
      ownerId : String,
      content : String,
      createdAt : Date,
      lastModified : Date
    }
  } 
})