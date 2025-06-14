import { Kafka, Producer } from "kafkajs";

export class KafkaProducer {
  private producer: Producer;

  constructor(private clientId: string, private brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async send(topic: string, messages: any[]) {
    await this.producer.send({
      topic,
      messages: messages.map((msg) => ({ value: JSON.stringify(msg) })),
    });
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
