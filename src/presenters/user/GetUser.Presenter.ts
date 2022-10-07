import { UserMinResponseDTO, UserResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { GetUserOutputPort } from "@/interactors/getUser.interactor";
import { UserMinVM, UserVM } from "@/ViewModels/UserVM";
import { BasePresenter } from "../_common/BasePresenter";



export default class GetUserPresenter implements GetUserOutputPort{
  present(params: UserResponseDTO | UserMinResponseDTO): UserVM | UserMinVM {
    if(params instanceof UserResponseDTO){
      return new UserVM(params);
    } else {
      return new UserMinVM(params);
    }
  }
}