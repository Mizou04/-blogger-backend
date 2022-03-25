"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetUserPresenter {
    present(result) {
        let data = {
            id: result.id,
            email: result.email,
            joinedAt: result.joinedAt,
            name: result.name
        };
        return data;
    }
}
exports.default = GetUserPresenter;
