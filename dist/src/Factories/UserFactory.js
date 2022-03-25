"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserController_1 = __importDefault(require("../controllers/GetUserController"));
const GetUserGetway_1 = __importDefault(require("../Gateways/GetUserGetway"));
const GetUserInteractor_1 = __importDefault(require("../Interactors/GetUserInteractor"));
let userGateway = new GetUserGetway_1.default();
class UserControllersFactory {
    static makeGetUserController() {
        let getUserInteractor = new GetUserInteractor_1.default(userGateway);
        let userController = new GetUserController_1.default(getUserInteractor);
        return userController;
    }
}
exports.default = UserControllersFactory;
