import { Router } from "express";
import multer from "multer";
import {
  uploadExcel,
  getTaskStatus,
  getTaskErrors,
} from "../controllers/excelControllers";

const router = Router();

router.post("/upload", (req, res) => {
  uploadExcel(req, res, req.app.locals.channel);
});
router.get("/:taskId", getTaskStatus);
router.get("/:taskId/errors", getTaskErrors);
router.get("/hello", (req, res) => res.send("Hello World!"));

export default router;
