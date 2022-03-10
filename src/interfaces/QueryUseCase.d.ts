declare interface QueryUseCase<TRequest, TResponse>{
  execute(request : TRequest) : TResponse
}