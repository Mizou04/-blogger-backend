import User from "@/Entities/User";
import { GetUserOutputPort } from "@/interactors/getUser.interactor";
import { UserVM } from "@/viewmodels/userVM";

export default class GetUserPresenter implements GetUserOutputPort{
  present(value: User): UserVM {
    let vm = new UserVM(value);
    return vm
  }
}