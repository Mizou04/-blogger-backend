import { UserMinResponseDTO } from "@/common/DTOs/User/UserResponseDTO";
import { GetUsersOutputPort } from "@/interactors/getUsers.interactor";
import { UserMinVM } from "@/ViewModels/UserVM";


export default class GetUsersPresenter implements GetUsersOutputPort{
  present(params: UserMinResponseDTO[]): UserMinVM[] {
    let data:UserMinVM[] = [];
    for(let i = 0; i < params.length; i++){
      data.push(params[i]);
    }
    return data;
  }
}