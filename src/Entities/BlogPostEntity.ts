class BlogPost implements IBlogPost<IUser, IComment>{
  id: string;
  author: IUser;
  text: string;
  title: string;
  comments?: IComment[] | undefined;
  reports?: { type: string; message?: string | undefined; }[];
  thumb: string;
  constructor(options : IBlogPost<IUser, IComment>){
    this.id = options.id;
    this.author = options.author;
    this.text = options.text;
    this.title = options.title;
    this.reports = options.reports;
    this.thumb = options.thumb;
  }
  generateId(){
    this.id = this.author.id + Date.now();
  }
}


// import { Notification } from "@/utils/notification";

// export default class BlogPost {
//   blogPosts : {[key : string]  : Partial<IBlogPost<IUser, IComment>>} = {};
//   ids : {[id : string] : string} = {};

//   addIdToIds(id : string){
//     this.ids[id] = id
//   }

//   async getBlogPost(id : string) : Promise<Partial<IBlogPost<Partial<IUser>, Partial<IComment>>> | undefined>{
//     if(id === "") return Promise.reject(new Error("no ID is provided"));
//     let article = this.blogPosts[id];
//     if(article){
//       return Promise.resolve(article)
//     } else {
//       return new PseudoBlogPost();
//     }
//   }

//   async setBlogPost(blogData : Partial<IBlogPost<IUser, IComment>>) : Promise<ANotification | Error>{
//     try{
//       if(blogData.author?.name == "Batman") return new Error("Batman not allowed");
//       this.blogPosts[blogData.id as string] = blogData;
//       this.addIdToIds(blogData.id as string);
//       return new Notification({message : blogData.title + " was added successfully", title : "blog status", type : "Blog Added"});
//     } catch(e){
//       throw new Error("Blog didn't added");
//     }
//   }

//   async removeBlogPost(id : string) : Promise<boolean>{
//     if(await this.getBlogPost(id)){
//       delete this.blogPosts[id];
//       return true;
//     }
//     return false
//   }

//   async updateBlogPost(id : string, newContent : IBlogPost<IUser, IComment>) : Promise<ANotification>{
//     this.blogPosts[id] = newContent
//     return new Notification({title : "blog modified", message : `${newContent.title} has been modified`, type : "Blog Updated"});
//   }

// }


// class PseudoBlogPost implements Partial<IBlogPost<Partial<IUser>, Partial<IComment>>>{
//   id = "undefined";
//   comments : Partial<IComment>[] = [{owner : {name : "not defined", id : "null"}, text : "not defined" }];
//   thumb : string = "/path/to/default/image";
//   title: string = "null";
//   author: Partial<IUser> = {name : "undefined", id : "unkonwn"};
// }
