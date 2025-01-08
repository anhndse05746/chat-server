import amqp from 'amqplib';
import { Channel, Connection } from 'amqplib';
import config from '../config/config';
import User from '../database/models/UserModel';
import { ApiError } from '../utils';

class RabbitMQService {
  private requestQueue = 'USER_DETAILS_REQUEST';
  private responseQueue = 'USER_DETAIL_RESPONSE';
  private connection!: Connection;
  private channel!: Channel;

  constructor() {
    this.init();
  }

  async init() {
    this.connection = await amqp.connect(config.MESSAGE_BROKER_URL!);
    this.channel = await this.connection.createChannel();

    this.channel.assertQueue(this.requestQueue);
    this.channel.assertQueue(this.responseQueue);

    this.listenForRequest();
  }

  async listenForRequest() {
    this.channel.consume(this.requestQueue, async (msg) => {
      if (msg && msg.content) {
        const { userId } = JSON.parse(msg.content.toString());
        const userDetails = await getUserDetails(userId);

        this.channel.sendToQueue(this.responseQueue, Buffer.from(JSON.stringify(userDetails)), {
          correlationId: msg.properties.correlationId,
        });

        this.channel.ack(msg);
      }
    });
  }
}

const getUserDetails = async (userId: string) => {
  const userDetails = User.findById(userId).select('-password');

  if (!userDetails) {
    throw new ApiError(404, 'User not found');
  }

  return userDetails;
};

export const rabbitMQService = new RabbitMQService();
export const innitalizeRabbitMQService = async () => {
  try {
    await rabbitMQService.init();
    console.log('RabbitMQ service initialized successfully');
  } catch (err) {
    console.error('Failed to initialize RabbitMQ service:', err);
  }
};
