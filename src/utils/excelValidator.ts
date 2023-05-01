import { ErrorModel } from "../models/errorModel";
import * as XLSX from "xlsx";
import { unlink } from "fs/promises";
import { TaskModel } from "../models/taskModel";

interface ExcelData {
  name: string;
  age: number;
}

export async function excelValidator(taskId: string, filePath: string) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: ExcelData[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

    let errorCount = 0;

    data.forEach((row: ExcelData, rowIndex: number) => {
      if (typeof row.name !== "string") {
        const error = new ErrorModel({
          taskId: taskId,
          row: rowIndex + 1,
          column: "name",
          message: "Invalid data type, expected string",
        });
        error.save();
        errorCount++;
      }

      if (typeof row.age !== "number") {
        const error = new ErrorModel({
          taskId: taskId,
          row: rowIndex + 1,
          column: "age",
          message: "Invalid data type, expected number",
        });
        error.save();
        errorCount++;
      }
    });

    await TaskModel.findByIdAndUpdate(taskId, {
      status: "done",
      errors: errorCount,
    });
    await unlink(filePath);
  } catch (error) {
    console.error("Error processing Excel file:", error);
  }
}
