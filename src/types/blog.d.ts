declare interface IBlogPost{
  title : string,
  id : string,
  thumb : string,
  comments? : Array<IComment>
}

declare interface IComment{
  owner : IUser,
  text : string
}
