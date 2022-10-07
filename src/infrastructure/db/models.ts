import mongoose from "mongoose"
import { UserSchema, PostSchema, CommentsSchema } from "./schemas"

export let UserModel = mongoose.model("user", UserSchema);
export let PostModel = mongoose.model("blogPost", PostSchema)
export let CommentModel = mongoose.model("comment", CommentsSchema);


