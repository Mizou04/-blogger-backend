import { User } from "@/Entities/User";

declare type criteriaFields = Exclude<keyof User, "lastModified" | "password" | "profilePic">;

