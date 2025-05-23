import { Schema, model } from "mongoose";

export interface ISubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

const SubscriptionSchema = new Schema<ISubscription>({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

export default model<ISubscription>("Subscription", SubscriptionSchema);
