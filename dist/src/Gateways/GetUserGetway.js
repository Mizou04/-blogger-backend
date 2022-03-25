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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class GetUserGateway {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let DATA;
            (0, fs_1.readFile)(path_1.default.join(__dirname, "src/files/users.json"), (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                DATA = JSON.parse(data.toString());
            }));
            try {
                let user = yield JSON.parse(DATA.toString());
                return user;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = GetUserGateway;
