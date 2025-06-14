import { Kafka, Consumer, EachMessagePayload } from "kafkajs";

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(
    private clientId: string,
    private brokers: string[],
    private groupId: string
  ) {
    const kafka = new Kafka({ clientId, brokers });
    this.consumer = kafka.consumer({ groupId });
  }

  async connect(
    topic: string,
    onMessage: (message: EachMessagePayload) => Promise<void>
  ) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async (payload) => {
        await onMessage(payload);
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
