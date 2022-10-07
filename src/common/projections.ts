import { projectionFromArray } from "@/helpers/mongoDB.helpers"
import { BlogPostMinResponseDTO, BlogPostResponseDTO } from "./DTOs/BlogPost/BlogPostResponseDTO"
import { UserMinResponseDTO, UserResponseDTO } from "./DTOs/User/UserResponseDTO"

let userDTOSample : UserResponseDTO = {
  params : {
    username :"",
    email :"",
    joinedAt : new Date(),
    lastModified : new Date(),
    profilePic :"",
    coverPic :"",
    providerId :"",
  }
}
let userMinDTOSample : UserMinResponseDTO = {
  username : "",
  email : "",
  id : "",
  profilePic : ""
}

let blogPostDTOSample : Omit<BlogPostResponseDTO, "like"> = {
  title: "",
  content: "",
  overview: "",
  thumbnail: "",
  ownerId: "",
  likes: new Set<string>(),
}
let blogPostMinDTOSample : BlogPostMinResponseDTO = {
  title: "",
  overview: "",
  thumbnail: "",
  ownerId: "",
  likes: new Set<string>(),
  
}


let userDTOKeys = Object.keys(userDTOSample.params);
let userMinDTOKeys = Object.keys(userMinDTOSample);
let blogPostDTOKeys = Object.keys(blogPostDTOSample);
let blogPostMinDTOKeys = Object.keys(blogPostMinDTOSample);

export let userResponseDTOProjection = projectionFromArray(userDTOKeys);
export let userMinResponseDTOProjection = projectionFromArray(userMinDTOKeys);
export let blogPostResponseDTOProjection = projectionFromArray(blogPostDTOKeys);
export let blogPostMinResponseDTOProjection = projectionFromArray(blogPostMinDTOKeys);
