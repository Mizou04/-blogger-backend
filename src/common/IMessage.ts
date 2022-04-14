export class IMessage{
  title : string;
  message : string;
  status : "Failure" | "Success";
  constructor(params : IMessage){
    this.title = params.title;
    this.message = params.message;
    this.status = params.status;  
  }
}