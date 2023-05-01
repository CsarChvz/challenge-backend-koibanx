import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let dbURI =
  "mongodb+srv://cesarchavez8728:pandita9@backendchallengekoibanx.3nkilsm.mongodb.net/backend?retryWrites=true&w=majority";

export async function connectDataBase() {
  try {
    await mongoose.connect((process.env.MONGODB_URI as string) || dbURI);
    console.log("$[MONOGOOSE]: Database connected");
  } catch (error) {
    console.error("$[MONOGOOSE]: Error connecting to database:", error);
  }
}
