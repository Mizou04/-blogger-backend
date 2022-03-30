import express from "express"
import getUserMiddleware from "./Infrastructure/Server/middlewares/getUserMiddleware";
import {logErrorMiddleware, returnErrorMiddleware, logError} from "@/Infrastructure/Server/middlewares/errorsMiddlewares"
import helmet from "helmet";
import cors from "cors"
import { setUserMiddleware } from "./Infrastructure/Server/middlewares/setUserMiddleware";
import path from "path";
import { CrossOriginOpenerPolicyOptions } from "helmet/dist/types/middlewares/cross-origin-opener-policy";

let app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3001']

app.use(helmet())
app.use(logErrorMiddleware);
app.use(cors({
  origin : '*'
}))
app.use(express.json(), express.urlencoded({extended : true}));



app.get("/user/:id", getUserMiddleware);
app.post("/user", setUserMiddleware);

app.get("/", (req, res)=>{
  res.send("hello")
  // res.sendFile(path.join(__dirname,"../../frontend/public/index.html"))
})


app.listen(3000, ()=>{
  console.log("you are listening at port:3000")
})
