import { Range } from "@/common/Range";
import { BlogPostMinVM, BlogPostVM } from "@/ViewModels/BlogPostVM";
import { BlogPostGateway, UserGateway } from "./_common/db.gateway";
import BlogPostRepository from "@/repositories/BlogPost.repository"
import { BlogPostMinResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { BlogPostParams } from "@/common/BlogPostParams";
import { BaseInteractor } from "./_common/BaseInteractor";
import { BasePresenter } from "@/presenters/_common/BasePresenter";
import { UserMinVM, UserVM } from "@/ViewModels/UserVM";
import { GetUsersInputPort } from "./getUsers.interactor";
import { UserMinResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { GetUserInputPort } from "./getUser.interactor";

export default class GetBlogPostsGroup implements GetBlogPostsGroupInputPort{
  constructor(
    public outputport: getBlogPostsGroupOutputPort, 
    public gateway : BlogPostGateway,
    public userInputPort : GetUserInputPort
    ){
    this.outputport = outputport;
    this.gateway = gateway;  
    this.userInputPort = userInputPort;
  }
  async execute(params: { rangeOrSize?: number | Range | undefined; criteria?: BlogPostParams | undefined; filter?: any; }) : Promise<BlogPostMinVM[]> {
    try {
      let data : BlogPostMinResponseDTO[] = await this.gateway.getBlogPosts(params.rangeOrSize, params.criteria, params.filter);
      // let user : UserMinVM[] = await this.usersInputPort.execute(params.rangeOrSize, {id : data?.find(bp => bp.ownerId == )})
      let usersRes : UserMinVM[] = [];

      for(let blog of data){
        usersRes.push(await this.userInputPort.execute({userParams : {id : blog.ownerId}, complete : false}));
      }

      return this.outputport.present({blogpostRes : data, usersRes : usersRes});
    } catch (e) {
      throw e
    }
  }
}

export interface GetBlogPostsGroupInputPort extends BaseInteractor<{
  rangeOrSize?: Range | number,
  criteria?: BlogPostParams,
  filter? : any
  }, 
  Promise<BlogPostMinVM[]>>{
  gateway : BlogPostGateway,
  outputport : getBlogPostsGroupOutputPort,
}

export interface getBlogPostsGroupOutputPort extends BasePresenter<{blogpostRes : BlogPostMinResponseDTO[]}, BlogPostMinVM[]>{
  present(data : {blogpostRes : BlogPostMinResponseDTO[], usersRes : UserMinVM[]}) : BlogPostMinVM[]
}