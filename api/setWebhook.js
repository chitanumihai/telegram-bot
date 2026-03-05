const bot = require("../bot");

// One-time endpoint to register the webhook with Telegram
module.exports = async (req, res) => {
  const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN || process.env.VERCEL_URL;
  const webhookUrl = `https://${WEBHOOK_DOMAIN}/api/webhook`;

  const result = await bot.telegram.setWebhook(webhookUrl);
  res.status(200).json({ ok: result, webhook: webhookUrl });
};
