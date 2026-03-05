const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}

const bot = new Telegraf(BOT_TOKEN);

const SECURITY_PHONE = process.env.SECURITY_PHONE || "N/A";
const SECURITY_CODE = process.env.SECURITY_CODE || "N/A";
const TRASH_PHONE = process.env.TRASH_PHONE || "N/A";
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
  ctx.answerCbQuery();
  ctx.reply(`Security\nPhone: ${SECURITY_PHONE}\nCode: ${SECURITY_CODE}`);
});

bot.action("trash", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(`Trash\nPhone: ${TRASH_PHONE}\nCode: ${TRASH_CODE}`);
});

module.exports = bot;
