
export interface IUseCaseInputPort<Q, R, G> {
  gateway : G;
  execute(params : Q) : R
}