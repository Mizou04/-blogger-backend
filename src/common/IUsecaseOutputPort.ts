import { IMessage } from "./IMessage";

export interface IUseCaseoutputPort<IN, OUT> {
  present(input : IN) : OUT;
  showError(e : any) : IMessage
}