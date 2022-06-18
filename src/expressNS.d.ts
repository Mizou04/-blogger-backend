import { User } from "./Entities/User";
import { UserVM } from "./viewmodels/userVM";

// declare global {
  declare namespace Express {
    declare interface Request {
      authenticatedUser : UserVM
    }
  // }
}

// declare module "express-serve-static-core"{
//   interface Request {
//     authenticatedUser : UserVM
//   }
//   interface Response {
//   }
// }