
export abstract class BaseInteractor<Input, Output>{
  abstract execute(params : Input) : Output;
}
