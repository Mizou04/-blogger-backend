import User from "@/Entities/User";
// export interface userParams{
//   criteria: "id" | "providerId" | "username",
//   value : User[userParams["criteria"]],
// }
type p = Pick<User, "email" | "providerId" | "username" | "id">
// export interface userParams{
//   criteria: "id" | "providerId" | "username",
//   value : User[userParams["criteria"]],
// }
export type userParams = {
  [key in keyof p]?: User[key];
};

// export type $User = {
//   [key in keyof Exclude<User, >]?: any;
// }

// let l : $User = 

// let r : Record<"ids", User> = {ids : new User()}
