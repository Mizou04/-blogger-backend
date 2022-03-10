declare interface IBlogPost<U, C>{
  id : string,
  title : string,
  author : U,
  text : string,
  thumb : string,
  comments? : Array<C>,
  reports? : {type : string, message?: string}[]
}

declare interface IComment{
  owner : Partial<IUser>,
  text : string
}

declare interface IUser{
  username : string,
  id : string,
  joinedAt : string,
  restricted : { // if duration > 0 => restricted (is true) else (is false)
    duration : string,
  }
}
