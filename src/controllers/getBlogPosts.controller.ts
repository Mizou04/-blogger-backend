import { InvalidInputError } from "@/common/customErrors";
import { Range } from "@/common/Range";
import { getBlogPostsGroupInputPort } from "@/interactors/getBlogpostsGroup.interactor";


export default class GetBlogPostsGroupController{

  constructor(public getBlogPostsInteractor : getBlogPostsGroupInputPort){
    this.getBlogPostsInteractor = getBlogPostsInteractor;
  }
  /**
   * 
   * @param params if this is a string, criteria will be accepted and used as RegExp test value
   */
  async execute<T>(params? : T) : Promise<any>
  async execute<T>(params : T, criteria?: T extends string ? "title" | "category" | "content" : null) : Promise<any>{
      let from =(params as unknown as Range).from, to = (params as unknown as Range).to;
    try {
      if(from >= to){
        throw new InvalidInputError(`"Range is not valid : left value (${from}) must not be greater than or equal right value (${to})`);
      } else 
      if(from <= 0 || to <= 0){
        throw new InvalidInputError("Range is not valid must not be less than 0");
      } else if(typeof from !== 'number' || typeof to !== 'number'){
        throw new InvalidInputError("can't accept a non number value")
      }
      return await this.getBlogPostsInteractor.execute<typeof params>(params, criteria)
    } catch (error) {
      throw error
    }
  }
}