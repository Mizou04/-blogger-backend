import { getExistedBlogPostsLengthOutputPort } from "@/interactors/getBlogPostsLength.interactor";



export class getExistedBlogPostLengthPresenter implements getExistedBlogPostsLengthOutputPort{
  present(data: number | object): number {
    if(typeof data == 'number'){
      return data
    } else { // is an object
      if((data as Array<any>).length){
        return (data as Array<any>).length;
      } else {
        return Object.keys(data).length;
      }
    }
  }

}