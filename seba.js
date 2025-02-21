require("dotenv").config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error("❌ Brak tokena API! Sprawdź plik .env");
  process.exit(1);
}

const { Telegraf } = require("telegraf");
const seba = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

seba.telegram.getMe().then((botInfo) => {
  console.log("✅ Seba wystartował, siema wariaty!");
  console.log(botInfo);
  //console.log(`Bot został zainicjalizowany jako @${botInfo.username}`);
});

const odpowiedzi = [
  "Hehe, piwko to życie, wiadomo 🍺",
  "Byku, jak nie piwko to co? 😎",
  "Dobra, dobra, ale masz jakieś 2 zł na browara? 🤣",
  "Ty, a może jakiegoś hot-doga z Orlenu ogarniemy? 🌭",
  "Szanuję za luźną gadkę, byle nie o robocie! 💪",
  "Poczekaj, tylko dopiję browarka i odpowiem 😂",
];

// komendy bota
seba.start((ctx) => ctx.reply("Siema byku! Co tam? 😎"));
seba.help((ctx) =>
  ctx.reply("No co, hehe, pytaj śmiało! Może o dobrego browarka? 🍻")
);
seba.on("text", (ctx) => {
  const randomOdp = odpowiedzi[Math.floor(Math.random() * odpowiedzi.length)];
  ctx.reply(randomOdp);
});

// uruchomienie seby
console.log("Budzimy Sebę...");
seba.launch().catch((err) => {
  console.error("❌ Błąd podczas uruchamiania Seby:", err);
  console.error("Pełny błąd:", err.stack);
  process.exit(1);
});

// bezpieczne zamykanie
process.once("SIGINT", () => {
  console.log("Seba idzie spać...");
  seba.stop("SIGINT");
  console.log("Seba poszedł spać!");
});
process.once("SIGTERM", () => {
  console.log("Seba idzie spać...");
  seba.stop("SIGTERM");
  console.log("Seba poszedł spać!");
});
