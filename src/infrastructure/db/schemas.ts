import { BlogPost } from "@/Entities/BlogPost";
import User from "@/Entities/User"
import { BlogPostVM } from "@/ViewModels/BlogPostVM";
import mongoose, {Connection, Schema, SchemaTypes, Collection} from "mongoose"


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
  },
  blogPosts : {
    type: {
      id : String,
      title : String,
      overview : String
    }
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
    minlength : 320
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
  },
  comments : {
    length : Number,
    data : {
      type : Map,
      of : {
        owner : {
          id : String,
          email : String,
          profilePic : String, 
          username : String,
        },
        text : String,
        date : Date,
        lastModified : Date,
        id : String
      },
      required : true
    },
  },
  likes : {
    length : Number,
    data : {
      type : Map,
      of : String,
    }
  },

})
