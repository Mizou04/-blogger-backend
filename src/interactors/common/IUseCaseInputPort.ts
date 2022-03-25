import User from "../../Entities/User";
import IUseCaseOutputPort from "./IUseCaseOutputPort";

export default interface IUseCaseInputPort<Query, Response, Gateway>{
  gateway : Gateway;
  // outputPort : IUseCaseOutputPort<Response>;
  execute(params : Query) : Promise<Response>;
}