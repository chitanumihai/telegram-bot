const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}

const bot = new Telegraf(BOT_TOKEN);

const SECURITY_PHONE = process.env.SECURITY_PHONE || "N/A";
const TRASH_CODE = process.env.TRASH_CODE || "N/A";

bot.start((ctx) => {
  ctx.reply(
    "Choose an option:",
    Markup.inlineKeyboard([
      [Markup.button.callback("Security", "security")],
      [Markup.button.callback("Trash", "trash")],
    ])
  );
});

bot.action("security", (ctx) => {
  ctx.answerCbQuery(`Security\nPhone: ${SECURITY_PHONE}`, { show_alert: true });
});

bot.action("trash", (ctx) => {
  ctx.answerCbQuery(`Trash\nCode: ${TRASH_CODE}`, { show_alert: true });
});

module.exports = bot;
