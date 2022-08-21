import mongoose from "mongoose"
import dot from 'dotenv'
dot.config();

let url = `mongodb://${process.env.MONGO_USERNAME as string}:${process.env.MONGO_PASSWORD as string}@${process.env.MONGO_HOSTNAME as string}:${process.env.MONGO_PORT as string}/${process.env.MONGO_DB as string}?authSource=admin`
mongoose.connect(url);