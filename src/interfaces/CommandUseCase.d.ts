declare interface CommandUseCase<TRequest, TPayload>{
  execute(request : TRequest, params : TPayload) : void
}