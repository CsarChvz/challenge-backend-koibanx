import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let dbURI =
  "mongodb+srv://cesarchavez8728:pandita9@backendchallengekoibanx.3nkilsm.mongodb.net/backend?retryWrites=true&w=majority";

export const connection = mongoose.createConnection(
  (process.env.MONGODB_URI as string) || dbURI
);

connection.once("open", () => {
  console.log("$[MONOGOOSE-CONNECTION]: Database connected");
});

connection.on("error", (error) => {
  console.error("$[MONOGOOSE]: Error connecting to database:", error);
});
