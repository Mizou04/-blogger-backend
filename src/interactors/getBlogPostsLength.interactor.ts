import { BlogPostGateway } from "./common/db.gateway";


export class getExistedBlogPostsLength implements getExistedBlogPostsLengthInputPort{
  constructor(public outputPort : getExistedBlogPostsLengthOutputPort, public gateway : BlogPostGateway){
    this.gateway = gateway;
    this.outputPort = outputPort;
  }
  async execute(filter? : any): Promise<any> {
    try {
      let data = await this.gateway.getExistedBlogPostsLength(filter);
      return this.outputPort.present(data);
    } catch (error) {
      throw error
    } 
  }
}


export interface getExistedBlogPostsLengthInputPort{
  gateway : BlogPostGateway;
  outputPort : getExistedBlogPostsLengthOutputPort;
  execute(filter? : any) : Promise<any>
}

export interface getExistedBlogPostsLengthOutputPort{
  present(data : any) : number
}