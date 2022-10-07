
export interface BasePresenter<input, output>{
  present(params : input) : output;
}