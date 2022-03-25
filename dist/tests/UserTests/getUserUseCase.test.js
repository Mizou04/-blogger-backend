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
const GetUserInteractor_1 = __importDefault(require("@/Interactors/GetUserInteractor"));
let userid = "123";
let user = User_1.default.create({ name: "hamzaz", email: "jsa@gmail.com", id: userid, joinedAt: "12/22/2022" });
// user.id = userid;
let gatewayMock = {
    users: { "123": user },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users[id];
        });
    }
};
let getUser = new GetUserInteractor_1.default(gatewayMock);
describe("getUser interactor tests", () => {
    it("returns a User successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(getUser.execute({ id: "123" })).toEqual(user);
    }));
    test("it doesn't find a user", () => __awaiter(void 0, void 0, void 0, function* () {
        function errorHandler() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getUser.execute({ id: "143" });
            });
        }
        yield expect(errorHandler()).rejects.toThrowError("user not found");
    }));
});
