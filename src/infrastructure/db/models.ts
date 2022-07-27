import mongoose from "mongoose"
import { UserSchema, PostSchema } from "./schemas"



export let UserModel = mongoose.model("user", UserSchema);
export let PostModel = mongoose.model("blogPost", PostSchema)
