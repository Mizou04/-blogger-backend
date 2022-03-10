
export class Notification implements ANotification{
  title: string;
  message: string;
  type: "Blog Added" | "Comment Added" | "User Notified";
  constructor(options : ANotification){
    this.title = options.title;
    this.message = options.message;
    this.type = options.type;
  }
}