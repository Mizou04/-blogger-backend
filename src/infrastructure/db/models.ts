import mongoose from "mongoose"
import { UserSchema } from "./schemas"


export let UserModel = mongoose.model("user", UserSchema);
