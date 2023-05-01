import { Channel } from "amqplib";
import { excelValidator } from "../utils/excelValidator";

export async function excelProcessor(channel: Channel) {
  channel.consume("excel_processing", async (msg) => {
    if (msg) {
      const { taskId, fileId } = JSON.parse(msg.content.toString());
      await excelValidator(taskId);
      channel.ack(msg);
    }
  });
}
