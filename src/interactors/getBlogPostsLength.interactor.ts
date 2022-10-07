<<<<<<< HEAD
import { BlogPostGateway } from "./_common/db.gateway";


export default class getExistedBlogPostsLength implements getExistedBlogPostsLengthInputPort{
=======
import { BlogPostGateway } from "./common/db.gateway";


export class getExistedBlogPostsLength implements getExistedBlogPostsLengthInputPort{
>>>>>>> origin/cleanup
  constructor(public outputPort : getExistedBlogPostsLengthOutputPort, public gateway : BlogPostGateway){
    this.gateway = gateway;
    this.outputPort = outputPort;
  }
<<<<<<< HEAD
  /**
   * 
   * @param filter like sql WHERE clause
   * @returns presenter output
   */
=======
>>>>>>> origin/cleanup
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
<<<<<<< HEAD
  present(data : number) : any
=======
  present(data : any) : number
>>>>>>> origin/cleanup
}