import { BlogPostGateway } from "./_common/db.gateway";


export default class getExistedBlogPostsLength implements getExistedBlogPostsLengthInputPort{
  constructor(public outputPort : getExistedBlogPostsLengthOutputPort, public gateway : BlogPostGateway){
    this.gateway = gateway;
    this.outputPort = outputPort;
  }
  /**
   * 
   * @param filter like sql WHERE clause
   * @returns presenter output
   */
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
  present(data : number) : any
}