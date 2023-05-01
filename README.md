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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
