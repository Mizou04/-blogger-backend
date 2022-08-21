import {BlogPost} from "@/Entities/BlogPost";
// export interface userParams{
//   criteria: "id" | "providerId" | "username",
//   value : User[userParams["criteria"]],
// }
type p = Pick<BlogPost, "title" | "id" | "content">
// export interface userParams{
//   criteria: "id" | "providerId" | "username",
//   value : User[userParams["criteria"]],
// }
export type BlogPostParams = {key : "title" | "id" | "content", value : string};

// export type $User = {
//   [key in keyof Exclude<User, >]?: any;
// }

// let l : $User = 

// let r : Record<"ids", User> = {ids : new User()}
