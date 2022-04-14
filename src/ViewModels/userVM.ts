export class UserVM{
  name : string;
  username : string;
  joinedAt : string;
  lastModified : string;
  id : string;
  email : string

  constructor(params : UserVM){
    this.name = params.name ;
    this.username =   params.username ;
    this.joinedAt =   params.joinedAt ;
    this.lastModified =   params.lastModified ;
    this.id =   params.id ;
    this.email = params.email
  }
} 