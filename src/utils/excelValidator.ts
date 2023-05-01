import { ErrorModel } from "../models/errorModel";
import * as XLSX from "xlsx";
import { TaskModel } from "../models/taskModel";
import { connection } from "../config/db_2";

interface ExcelData {
  name: string;
  age: number;
  nums: number[];
}

export async function excelValidator(taskId: string) {
  try {
    await TaskModel.findByIdAndUpdate(taskId, {
      status: "processing",
    });

    const file = await connection
      .collection("excel_files.files")
      .findOne({ filename: `${taskId}.xlsx` });

    if (!file) {
      console.error("File not found");
      return;
    }

    const buffer = await connection.collection("excel_files.chunks").findOne({
      files_id: file._id,
    });

    // Se lee el archivo de la base de datos que se pidio
    const workbook = XLSX.read(buffer?.data.buffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const dataRaw = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Antes de comprobar los datos se puede hacer una validación de que el archivo tenga el formato correcto
    // En este caso se puede validar que el archivo tenga la cantidad de columnas correctas y que tengan el nombre correcto
    let errorCount = 0;
    const columnas: any = dataRaw[0];
    const columnsNames = ["name", "age", "nums"];
    // Se debe de checar que las columnas o el array sean iguales

    if (!arraysEqual(columnas, columnsNames)) {
      const error = new ErrorModel({
        taskId,
        column: "N/A - file-format",
        row: 0,
        message: "El archivo no tiene el formato correcto",
      });
      await error.save();
      errorCount++;

      await TaskModel.findByIdAndUpdate(taskId, {
        status: "done",
        errors: errorCount,
      });
      return;
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    let json: ExcelData[] = jsonData.map((row: any) => {
      let nums = row.nums.split(",").map((num: string) => parseInt(num));
      return {
        name: row.name,
        age: row.age,
        nums: nums,
      };
    });

    json.forEach(async (row: ExcelData, rowIndex: number) => {
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

      if (!Array.isArray(row.nums)) {
        // Después se tiene que checar que el array tenga puros valores numericos
        const error = new ErrorModel({
          taskId: taskId,
          row: rowIndex + 1,
          column: "nums",
          message: "Invalid data type, expected array",
        });
        error.save();
        errorCount++;
      } else {
        row.nums.forEach((num: number, index: number) => {
          if (typeof num !== "number") {
            const error = new ErrorModel({
              taskId: taskId,
              row: rowIndex + 1,
              column: `nums[${index}]`,
              message: "Invalid data type, expected number-array",
            });
            error.save();
            errorCount++;
          }
        });
      }
    });

    // Actualizamos el estado de la tarea
    await TaskModel.findByIdAndUpdate(taskId, {
      status: "done",
      errors: errorCount,
    });

    console.log("Excel file processed");
  } catch (error) {
    console.error("Error processing Excel file:", error);
  }
}

function arraysEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return (
    arr1.every((elem) => arr2.includes(elem)) &&
    arr2.every((elem) => arr1.includes(elem))
  );
}
