import express from "express";
import webpush from "web-push";

const router = express.Router();

const subscriptions: webpush.PushSubscription[] = [];

// POST /api/subscribe
router.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscribed" });
});

// POST /api/notify (do testu powiadomień)
router.post("/notify", async (req, res) => {
  const { title, body } = req.body;
  await Promise.all(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        sub,
        JSON.stringify({ title: title || "Hello", body: body || "World" })
      )
    )
  );
  res.json({ message: "Notifications sent" });
});

export default router;
