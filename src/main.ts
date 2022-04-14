import express from "express"
import helmet from "helmet";
import cors from "cors";
import userRouter from "./Infrastracture/server/routers/UserRouter";
// import {} from "body"

let app = express();

app.use(helmet())
app.use(cors({
  origin : "*",
  methods : ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(require("exp"))

app.use(userRouter);

const PORT = 3000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})