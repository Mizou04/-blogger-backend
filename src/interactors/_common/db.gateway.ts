import { BlogPostParams } from "@/common/BlogPostParams";
import { BlogPostMinResponseDTO, BlogPostResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { UserMinResponseDTO, UserResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { Range } from "@/common/Range";
import { userParams } from "@/common/userParams";
import BlogPost from "@/Entities/BlogPost";
import User from "@/Entities/User";

export interface UserGateway{
  /* 
    -----------
      Queries   
    -----------
   */
  /**
   * 
   * @param filter to get only the count of a certain kind of users (for example new ones, or those who are banned...)
   */
  getUsersCount(filter? : any) : Promise<number>;
  /**
   * @param params : key:value pair of valid User fields (example user id and it's value,)
   */
  getUser<T = boolean>(params : userParams, complete : T) : Promise<UserResponseDTO | UserMinResponseDTO> //should not returning the user we will get there soon;
  // getUser(params? : userParams) : string;

  // getUser(params : userParams, complete? : true) : Promise<UserResponseDTO>;
  // getUser(params : userParams, complete? : false) : Promise<UserMinResponseDTO>;
  // getUser(params : userParams, complete? : boolean) : Promise<UserMinResponseDTO | UserResponseDTO>;
  /**
   * 
   * @param sizeOrRange a range or number of DOCs to get
   * @param criteria username for filtering purpose
   * @param criteria or filter can be used for the same purpose
   * filters can be a string or object
   * criteria is processed differently
   */
  getUsers(sizeOrRange? : Range | number, criteria?: userParams, filter? : any) : Promise<UserMinResponseDTO[]> //should not returning the user we will get there soon;
  /* 
    ------------
      Commands   
    ------------
   */
  /**
   * 
   * @param params User data except the ones generated by the system
   */
  setUser(params : User) : Promise<null>,
  updateUser(params : userParams, newUserData : User) : Promise<null>,
  deleteUser(params : userParams) : Promise<null>,
}

export interface BlogPostGateway{
  /* 
    -----------
      Queries   
    -----------
   */
  /**
   * @param filter for getting the length of blogposts with certain criterias  
   */
  getExistedBlogPostsLength(filter? : any) : Promise<number>
  /**
   * 
   * @param params a range or number of DOCs to get
   * @param criteria for filtering purposes 
   * @param filter any filters can be a string or object
   */
  getBlogPosts(sizeOrRange?: number | Range | undefined, criteria?: BlogPostParams | undefined, projection?: string[] | undefined, filter?: any) : Promise<BlogPostMinResponseDTO[]>,
  getBlogPost(params : BlogPostParams, projection? : string[], filter? : any ) : Promise<BlogPostResponseDTO>,
  
  /* 
    ------------
      Commands   
    ------------
   */
  setBlogPost(params :  BlogPost) : Promise<null>,
  updatePost(params :  BlogPostParams, newBlogPostData : Partial<BlogPost>) : Promise<null>,
  deletePost(params :  BlogPostParams) : Promise<null>,
}