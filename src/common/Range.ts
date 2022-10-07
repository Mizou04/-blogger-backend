export class Range{
  constructor(public from : number, public to : number){
    this.from = from;
    this.to = to;
  }

  static equalize(range : Range){
    if(range.to <= range.from){
      range.from--;
    }
    return range;
  }
} 