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

## 🐳 Kafka Setup with Docker Compose

To run Kafka and Zookeeper locally, copy and paste the following into a `docker-compose.yml` file:

```yaml
version: "2"
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.2.1
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.2.1
    container_name: kafka
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Then run:

```bash
docker-compose up -d
```

This will:

- Start **Zookeeper** on port `2181`
- Start **Kafka** on port `9092`

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
