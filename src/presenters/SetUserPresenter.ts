import User from "@/Entities/User";
import IUseCaseOutputPort from "@/Interactors/common/IUseCaseOutputPort";
import { INotificationViewModel } from "@/ViewModels/INotificationViewModel";


export default class SetUserPresenter implements IUseCaseOutputPort<string, INotificationViewModel>{
  present(result: string): INotificationViewModel {
    let message : INotificationViewModel = {title : "USER STATUS", message : result};
    return message
  }
}