import { Request, Response } from "express";
import { TaskModel } from "../models/taskModel";
import { ErrorModel } from "../models/errorModel";
import { Channel } from "amqplib";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

async function uploadExcel(req: Request, res: Response, channel: Channel) {
  const taskId = (await TaskModel.create({})).id;

  const storage = new GridFsStorage({
    url: "mongodb+srv://cesarchavez8728:pandita9@backendchallengekoibanx.3nkilsm.mongodb.net/backend?retryWrites=true&w=majority",
    file: (req, file) => {
      file.filename = `${taskId}.xlsx`;

      return {
        filename: file.filename,
        bucketName: "excel_files",
      };
    },
  });

  const upload = multer({ storage });
  const uploadMiddleware = upload.single("file");

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      res.status(500).json({ error: "Error uploading file" });
      return;
    }
    channel.sendToQueue(
      "excel_processing",
      Buffer.from(JSON.stringify({ taskId: taskId, fileId: taskId }))
    );
    res.json({ taskId: taskId });
  });
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
