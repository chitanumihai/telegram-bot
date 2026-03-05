const bot = require("../bot");

// One-time endpoint to register the webhook with Telegram
module.exports = async (req, res) => {
  const VERCEL_URL = process.env.VERCEL_URL;
  const webhookUrl = `https://${VERCEL_URL}/api/webhook`;

  const result = await bot.telegram.setWebhook(webhookUrl);
  res.status(200).json({ ok: result, webhook: webhookUrl });
};
