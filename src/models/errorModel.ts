import mongoose, { Schema } from "mongoose";

export interface Error {
  taskId: string;
  row: number;
  column: string;
  message: string;
}

const errorSchema = new Schema<Error>({
  taskId: { type: String, required: true },
  row: { type: Number, required: true },
  column: { type: String, required: true },
  message: { type: String, required: true },
});

export const ErrorModel = mongoose.model<Error>("Error", errorSchema);
