const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}

const bot = new Telegraf(BOT_TOKEN);

const SECURITY_PHONE = process.env.SECURITY_PHONE || "N/A";
const TRASH_CODE = process.env.TRASH_CODE || "N/A";

const buttons = Markup.inlineKeyboard([
  [Markup.button.callback("Numar telefon pază", "security")],
  [Markup.button.callback("Cod acces gunoi", "trash")],
  [Markup.button.callback("Închide", "close")],
]);

const welcomeMessage =
  "Salut! Eu sunt un bot care oferă informații utile pentru locatarii acestui bloc.\nApasă pe butoanele de mai jos pentru a obține detaliile necesare.";

bot.start((ctx) => {
  ctx.reply(`${welcomeMessage}\n\nScrie /help pentru a vedea opțiunile disponibile.`);
});

bot.help((ctx) => {
  ctx.reply(welcomeMessage, buttons);
});

bot.on("new_chat_members", (ctx) => {
  const newMembers = ctx.message.new_chat_members.filter((m) => !m.is_bot);
  if (newMembers.length > 0) {
    const names = newMembers.map((m) => m.first_name).join(", ");
    ctx.reply(`Bine ai venit ${names}!\n\n${welcomeMessage}`, buttons);
  }
});

bot.action("security", (ctx) => {
  ctx.answerCbQuery(`Numar telefon pază:\n${SECURITY_PHONE}`, { show_alert: true });
});

bot.action("trash", (ctx) => {
  ctx.answerCbQuery(`Cod acces gunoi:\n${TRASH_CODE}`, { show_alert: true });
});

bot.action("close", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage();
});

module.exports = bot;
