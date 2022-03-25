import User from "../Entities/User";
import IUseCaseOutputPort from "../Interactors/common/IUseCaseOutputPort";
import IUserViewModel from "../ViewModels/IUserViewModel";

export default class GetUserPresenter implements IUseCaseOutputPort<User, IUserViewModel>{
  
  present(result: User): IUserViewModel {
    let data : IUserViewModel = {
      id : result?.id,
      email : result?.email,
      name : result?.name,
      joinedAt : result?.joinedAt
    }
    return data
  }
}