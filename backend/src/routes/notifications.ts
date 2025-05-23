import express from "express";
import webpush from "web-push";

const router = express.Router();

const subscriptions: webpush.PushSubscription[] = [];

// POST /api/notifications/subscribe
router.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({ message: "Subscribed" });
});

// POST /api/notifications/notify  (test manualny)
router.post("/notify", async (req, res) => {
  const { title, body } = req.body;
  await sendNotification(title, body);
  res.json({ message: "Notifications sent" });
});

/* === helper używany przez inne moduły === */
export const sendNotification = async (title: string, body: string) => {
  const payload = JSON.stringify({ title, body });
  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      console.error("Push error", err);
    }
  }
};

export default router;
