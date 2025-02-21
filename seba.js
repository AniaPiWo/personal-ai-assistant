require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Siema byku! Co tam? 😎"));
bot.help((ctx) =>
  ctx.reply("No co, hehe, pytaj śmiało! Może o dobrego browarka? 🍻")
);
bot.on("text", (ctx) => {
  const odpowiedzi = [
    "Hehe, piwko to życie, wiadomo 🍺",
    "Byku, jak nie piwko to co? 😎",
    "Dobra, dobra, ale masz jakieś 2 zł na browara? 🤣",
    "Ty, a może jakiegoś hot-doga z Orlenu ogarniemy? 🌭",
    "Szanuję za luźną gadkę, byle nie o robocie! 💪",
    "Poczekaj, tylko dopiję browarka i odpowiem 😂",
  ];
  const randomOdp = odpowiedzi[Math.floor(Math.random() * odpowiedzi.length)];
  ctx.reply(randomOdp);
});

bot.launch();
console.log("Bot Seba wystartował, siema wariaty! 😎");
