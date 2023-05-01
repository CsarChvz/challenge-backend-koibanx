import { Request, Response } from "express";
import { TaskModel } from "../models/taskModel";
import { ErrorModel } from "../models/errorModel";
import { excelValidator } from "../utils/excelValidator";
import { Channel } from "amqplib";

async function uploadExcel(req: Request, res: Response, channel: Channel) {
  const taskId = (await TaskModel.create({}))._id;

  channel.sendToQueue(
    "excel_processing",
    Buffer.from(JSON.stringify({ taskId, filePath: req.file?.path }))
  );

  res.json({ taskId });
}

async function getTaskStatus(req: Request, res: Response) {
  const task = await TaskModel.findById(req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
}

async function getTaskErrors(req: Request, res: Response) {
  const { taskId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const errors = await ErrorModel.find({ taskId })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(errors);
}

export { uploadExcel, getTaskStatus, getTaskErrors };
