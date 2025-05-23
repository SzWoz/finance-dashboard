import { Router } from "express";
import webpush from "web-push";
import Subscription from "../models/Subscription.js";

const router = Router();

router.post("/subscribe", async (req, res) => {
  const sub = new Subscription(req.body);
  await sub.save();
  res.status(201).json({});
});

export const sendNotification = async (title: string, body: string) => {
  const subs = await Subscription.find();
  const payload = JSON.stringify({ title, body });
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub as any, payload);
    } catch (err) {
      console.error("Push error", err);
    }
  }
};

export default router;
