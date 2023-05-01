import mongoose, { Schema } from "mongoose";

export interface Task {
  status: string;
  errors: number;
}

const taskSchema = new Schema<Task>({
  status: { type: String, default: "pending" },
  errors: { type: Number, default: 0 },
});

export const TaskModel = mongoose.model<Task>("Task", taskSchema);
