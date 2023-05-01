<div align="center">
  <h1>Backend Challenge Koibanx</h1>
  <h3>Backend Frontend - API REST- <a>https://challenge-frontend-koibanx.vercel.app/</a></h3>

<br />

<h3>CsarChvz Linkedin</h3> <a href="https://github.com/trpc/trpc/blob/main/LICENSE">
<a href="https://www.linkedin.com/in/csarchvz/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<br />
<br />

## 🔥 Developed in

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/rabbitmq-%23FF6600.svg?&style=for-the-badge&logo=rabbitmq&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
<br />
<br />

## 🚀 Preview

  <figure>
    <img src="./gifChallenge.gif" alt="Demo" />
    <figcaption>
      <p align="center">
        API REST - Excel Upload and Validation with Status
      </p>
    </figcaption>
  </figure>
</div>

## 🛠 Development Setup

We have to have docker to initilize rabbitmq with docker.

Run run the installation dependecies:

```bash
npm i
# or
yarn add package.json
```

First, run the docker command to start rabbit mq server

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.11-management
```

Run the development server:

```bash
npm run start
# or
yarn start

```

## 💡 REST API

This project provides a RESTful API for uploading Excel files, validating their format, and notifying the processing status. The uploaded Excel files are stored in MongoDB, and the validation results are returned as task status updates.

## Endpoints

### POST /tasks/upload

Upload an Excel file for validation.

#### Request Parameters

- `file`: The Excel file to be uploaded. It should be a `.xlsx` file.

#### Response

- `taskId`: A unique identifier for the uploaded file's validation task.

### GET /tasks/:taskId

Retrieve the status of a validation task.

#### URL Parameters

- `taskId`: The unique identifier of the validation task.

#### Response

- `status`: The current status of the validation task. It can be "pending", "processing", or "done".
- `errors`: The number of errors found in the Excel file.

### GET /api/tasks/:taskId/errors

Retrieve the errors found in the Excel file.

#### URL Parameters

- `taskId`: The unique identifier of the validation task.

#### Query Parameters

- `page`: The page number for paginated results (optional, default is 1).
- `limit`: The number of errors per page (optional, default is 10).

#### Response

An array of error objects with the following properties:

- `row`: The row number in the Excel file where the error occurred.
- `column`: The column name in the Excel file where the error occurred.
- `message`: A description of the error.

## Example Requests and Responses

### Uploading an Excel File

**Request:**

POST /tasks/upload
Content-Type: multipart/form-data

[file: example.xlsx]

**Response:**

```json
{
  "taskId": "60a8c9f5d5b5d2b1f4e8234c"
}
```

### Retrieving a Task's Status

**Request:**
GET /api/tasks/60a8c9f5d5b5d2b1f4e8234c

**Response:**

```json
{
  "status": "done",
  "errors": 3
}
```

### Retrieving a Task's Errors

**Request:**
GET /api/tasks/60a8c9f5d5b5d2b1f4e8234c/errors?page=1&limit=10

**Response:**

```json
[
  {
    "row": 2,
    "column": "name",
    "message": "Invalid data type, expected string"
  },
  {
    "row": 3,
    "column": "age",
    "message": "Invalid data type, expected number"
  },
  {
    "row": 4,
    "column": "age",
    "message": "Invalid data type, expected number"
  }
]
```

## 📝 Justification of the use of "Rabbit MQ"

<p>
RabbitMQ is a task queue messaging solution (message broker) that uses the Advanced Message Queuing Protocol (AMQP) for communication between message producers and consumers.

<strong>Decoupling</strong>: RabbitMQ allows for separating the responsibilities of different parts of the system. In this case, the API is responsible for receiving Excel files and creating tasks, while a separate process handles validating and processing the files. Using RabbitMQ enables these components to communicate asynchronously and non-blocking, making maintenance and scalability easier.

<strong>Scalability</strong>: RabbitMQ handles message queuing and distributes work among multiple consumers, allowing the system to scale according to demand. For example, if validating Excel files is resource-intensive, you can add more consumer instances to process more files in parallel without affecting the API's performance.

<strong>Resilience</strong>: RabbitMQ stores messages in persistent queues, which means that if a consumer fails or disconnects, the messages are not lost and can be reprocessed when the consumer is available again. This helps ensure that Excel file validation tasks are completed even if temporary errors or interruptions occur in the system.

<strong>Load tolerance</strong>: Using RabbitMQ allows the system to withstand sudden increases in workload. If many Excel files are received at the same time, RabbitMQ will queue the messages, and consumers will process them as they become available. This prevents the API from becoming blocked or slow due to workload overload.

</p>

## 🧑‍💻 Developer

  <figure>
    <div class="image-container">
    <img src="https://avatars.githubusercontent.com/u/79390377?v=4" alt="CsarChvz" style="width: 100%; height: auto; border-radius: 50%"/>

</div>
    <figcaption>
      <h1 align="center">
        César Chávez
      </h1>
    </figcaption>
  </figure>
```
