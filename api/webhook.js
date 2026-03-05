const bot = require("../bot");

// Vercel serverless handler for Telegram webhook
module.exports = async (req, res) => {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body);
    res.status(200).json({ ok: true });
  } else {
    res.status(200).json({ status: "Bot is running" });
  }
};
