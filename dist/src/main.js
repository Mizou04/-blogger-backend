"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserMiddleware_1 = __importDefault(require("./Infrastructure/Server/middlewares/getUserMiddleware"));
let app = (0, express_1.default)();
app.use(getUserMiddleware_1.default);
app.get("/", getUserMiddleware_1.default);
app.listen(3000, () => {
    console.log("you are listening at port:3000");
});
// let app = express();
// app.get("/", (req, res, next)=>{
//   res.send('hello');
//   next();
// })
// app.listen(3000, ()=>{
//   console.log("listening on 3000")
// })
