import User from "@/Entities/User";

type p = Pick<User, "email" | "providerId" | "username" | "id">

/**
 * @type userParams - a key value pair to get the user (by id, username...);
 */
export type userParams = {
  [key in keyof p]?: User[key];
};