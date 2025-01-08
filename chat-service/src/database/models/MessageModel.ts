import mongoose, { Document, Schema } from 'mongoose';

enum MessageStatus {
  NotDelivered = 'NOT_DELIVERED',
  Delivered = 'DELIVERED',
  Seen = 'SEEN',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Deleted = 'DELETED',
}

export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  status: MessageStatus;
  createAt: Date;
  updateAt: Date;
}

export const MessageSchema: Schema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.NotDelivered,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
