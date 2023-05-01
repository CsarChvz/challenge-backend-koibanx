import amqp, { Connection, Channel } from "amqplib";

export async function createRabbitMQChannel(): Promise<Channel> {
  const connection: Connection = await amqp.connect("amqp://localhost");
  if (!connection) throw new Error("Error connecting to RabbitMQ");
  console.log("$[RABBITMQ]: Connected to RabbitMQ");

  const channel: Channel = await connection.createChannel();
  await channel.assertQueue("excel_processing");
  return channel;
}
