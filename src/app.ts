import express from "express";
import excelRoutes from "./routes/excelRoutes";
import { connectDataBase } from "./config/db";
import { createRabbitMQChannel } from "./config/rabbitmq";
import { excelProcessor } from "./queues/excelProcessor";
const app = express();

app.use(express.json());
app.use("/tasks", excelRoutes);
app.use(express.urlencoded({ extended: true }));

connectDataBase();

(async () => {
  const channel = await createRabbitMQChannel();
  app.locals.channel = channel;
  excelProcessor(channel);
})();

export default app;
