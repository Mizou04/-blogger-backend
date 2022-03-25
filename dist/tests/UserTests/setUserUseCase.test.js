"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@/Entities/User"));
const SetUserInteractor_1 = __importDefault(require("@/Interactors/SetUserInteractor"));
let userid = "123";
let gatewayMock = {
    users: {},
    setUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users[payload.id] = payload;
        });
    }
};
// let user = User.create({name : "hamzaz", email : "jsa@gmail.com", id : userid, joinedAt : "12/22/2022"});
let setUser = new SetUserInteractor_1.default(gatewayMock);
function errorHandler(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setUser.execute(user);
    });
}
describe("SetUser interactor tests", () => {
    let user = User_1.default.create({ name: "hamzaz", email: "jsa@gmail.com", id: userid, joinedAt: "12/22/2022" });
    it("creates a User successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(errorHandler(user)).resolves.not.toThrow("username must be greated than 5 characters long" || "user Email is not valid");
    }));
    it("throws an Error due to invalid Name entry", () => __awaiter(void 0, void 0, void 0, function* () {
        user = User_1.default.create({ name: "ham", email: "jsa@gmail.com", id: userid, joinedAt: "12/22/2022" });
        yield expect(errorHandler(user)).resolves.toThrow("username must be greated than 5 characters long");
    }));
    it("throws an Error due to invalid Email entry", () => __awaiter(void 0, void 0, void 0, function* () {
        user = User_1.default.create({ name: "hamzaz", email: "jsa@gmail", id: userid, joinedAt: "12/22/2022" });
        yield expect(errorHandler(user)).resolves.toThrow("user Email is not valid");
    }));
});
