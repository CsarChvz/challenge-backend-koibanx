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

    // Antes de comprobar los datos se puede hacer una validación de que el archivo tenga el formato correcto
    // En este caso se puede validar que el archivo tenga la cantidad de columnas correctas y que tengan el nombre correcto
    let errorCount = 0;

    const columnsNames = ["name", "age", "nums"];
    const columns = Object.keys(worksheet);
    if (columns.length !== columnsNames.length) {
      const error = new ErrorModel({
        taskId: taskId,
        row: 0,
        column: "file-format",
        message: "Invalid file format - Columns Different",
      });
      error.save();
      errorCount++;
      return;
    }

    const data: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);

    // Validación de los datos -- Se puede mejorar
    // En este caso se puede hacer unas reglas para la validación de los datos dependiendo del archivo/tarea
    // En este caso se puede definir que columnas deben de estar definidas y que tipo de dato deben de ser (string, number, array, etc)
    // para el archivo que se busca subir

    // Para este caso se definió la tabla que ponen de ejemplo. Se valida que los datos sean del tipo correcto

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

      if (!Array.isArray(row.nums)) {
        const error = new ErrorModel({
          taskId: taskId,
          row: rowIndex + 1,
          column: "nums",
          message: "Invalid data type, expected array",
        });
        error.save();
        errorCount++;
      }
    });

    await TaskModel.findByIdAndUpdate(taskId, {
      status: "done",
      errors: errorCount,
    });
    console.log("$[VALIDATOR-EXCEL]: ", data);
  } catch (error) {
    console.error("Error processing Excel file:", error);
  }
}

// const readStream = gfs.createReadStream({
//   filename: `${taskId}.xlsx`,
// });
// const chunks: any[] = [];
// const bufferPromise = new Promise<Buffer>((resolve, reject) => {
//   readStream
//     .on("data", (chunk) => chunks.push(chunk))
//     .on("error", reject)
//     .on("end", () => resolve(Buffer.concat(chunks)));
// });

// const buffer = await bufferPromise;
// // Obtenemos el archivo de la base de datos
// const workbook = XLSX.read(buffer, { type: "buffer" });
// const firstSheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[firstSheetName];
// const jsonData = XLSX.utils.sheet_to_json(worksheet);

// let errorCount = 0;

// console.log("$[VALIDATOR-EXCEL]: ", jsonData);

// data.forEach((row: ExcelData, rowIndex: number) => {
//   if (typeof row.name !== "string") {
//     const error = new ErrorModel({
//       taskId: taskId,
//       row: rowIndex + 1,
//       column: "name",
//       message: "Invalid data type, expected string",
//     });
//     error.save();
//     errorCount++;
//   }

//   if (typeof row.age !== "number") {
//     const error = new ErrorModel({
//       taskId: taskId,
//       row: rowIndex + 1,
//       column: "age",
//       message: "Invalid data type, expected number",
//     });
//     error.save();
//     errorCount++;
//   }
// });

// await TaskModel.findByIdAndUpdate(taskId, {
//   status: "done",
//   errors: errorCount,
// });
