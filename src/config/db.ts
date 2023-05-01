import mongoose from "mongoose";

export async function connectDataBase() {
  try {
    await mongoose.connect(
      "mongodb+srv://cesarchavez8728:pandita9@backendchallengekoibanx.3nkilsm.mongodb.net/backend_challenge_koibanx?retryWrites=true&w=majority"
    );
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
