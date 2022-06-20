import User from "@/Entities/User";

export interface userParams{
  criteria: "id" | "providerId" | "username",
  value : User[userParams["criteria"]],
}