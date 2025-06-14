# Kafka Utils

A lightweight utility library for Kafka using [kafkajs](https://github.com/tulios/kafkajs).  
Provides reusable `KafkaProducer` and `KafkaConsumer` classes.

## 🚀 Installation

```bash
npm install kafka-utils
```

> Make sure Kafka is running before using this library.

---

## 📦 Usage

### KafkaProducer Example

```ts
import { KafkaProducer } from "kafka-utils";

const clientId = "order-service";
const brokers = ["localhost:9092"];

const producer = new KafkaProducer(clientId, brokers);
await producer.connect();
await producer.send("orders-topic", [{ value: "New order created" }]);
await producer.disconnect();
```

---

### KafkaConsumer Example

```ts
import { KafkaConsumer } from "kafka-utils";

const clientId = "billing-service";
const brokers = ["localhost:9092"];
const groupId = "billing-group";

const consumer = new KafkaConsumer(clientId, brokers, groupId);
await consumer.connect("orders-topic", async ({ message }) => {
  console.log("Received:", message.value?.toString());
});
```

---

## ⚙️ Kafka Requirements

This package does **not** start Kafka. You must ensure Kafka is already running, either:

- Locally using Docker
- Remotely via a cloud service like Confluent Cloud
- On your infrastructure

---

## 🐳 Running Kafka with Docker (Optional)

To spin up Kafka locally using Docker:

```bash
docker network create kafka-net
```

```bash
docker run -d --name zookeeper --network kafka-net -p 2181:2181 bitnami/zookeeper:latest
```

```bash
docker run -d --name kafka --network kafka-net -p 9092:9092 \
  -e KAFKA_BROKER_ID=1 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
  bitnami/kafka:latest
```

---

## 🐳 Docker Compose Setup (Recommended)

You can use the included `docker-compose.yml` to start Kafka and Zookeeper easily:

```bash
docker-compose up -d
```

This will:

- Start **Zookeeper** on port `2181`
- Start **Kafka** on port `9092`
- Create a network named `kafka-net`

> Make sure Docker is installed and running before executing this command.

---

## 📁 Exports

```ts
import { KafkaProducer, KafkaConsumer } from "kafka-utils";
```

---

## 🛠 Requirements

- Kafka broker running (locally or remotely)
- Node.js v14+ recommended

---

## 📃 License

MIT © Yogaraj Saravanan
