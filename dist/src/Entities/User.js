"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class User {
    constructor(options) {
        this.name = options.name;
        this.email = options.email;
        this.id = options.id;
        this.joinedAt = options.name;
    }
    static create(options) {
        if (options.name.trim().length < 5)
            throw new Error("username must be greated than 5 characters long");
        if (emailValidator.test(options.email.trim()))
            throw new Error("user Email is not valid");
        options = Object.assign(Object.assign({}, options), { id: (0, uuid_1.v4)() });
        return new User(options);
    }
}
exports.default = User;
let emailValidator = /^\w[/*$&é"'(-è_çà)=][^\s]{4, 25}\.\w+\.(com|net|fr|ma)$/igm;
