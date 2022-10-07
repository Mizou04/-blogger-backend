import { SetUserOutputPort } from "@/interactors/setUser.interactor";

export default class SetUserPresenter implements SetUserOutputPort{
  present(something?: any): { title: string; message: string; } {
    return {
      title : "success",
      message : "User added successfully!"
    }
  }
}