
declare interface Input{
  execute(): void,
}
declare interface MYParams {
  readonly params : Array<string>
  log() :void
}

declare let MYParams :{
  prototype : MYParams;
  new(params : Array<string>);
}

IntersectionObserver