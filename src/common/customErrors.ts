export class InvalidInputError extends Error{
  title : string;
  constructor(msg : string){
    super(msg);
    this.title = super.name;
    this.message = msg
  }
}

export class DBError extends Error{
  title : string;
  constructor(msg : string){
    super(msg);
    this.title = super.name;
    this.message = msg
  }
}

