import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import OpenAI from "openai";

dotenv.config();

// init gpt
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Brak klucza API OpenAI! Sprawdź plik .env");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "write a haiku about ai" }],
});
console.log(completion.choices[0].message.content);

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error("❌ Brak tokena API! Sprawdź plik .env");
  process.exit(1);
}

// init bota
const seba = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

seba.telegram.getMe().then((botInfo) => {
  console.log("✅ Seba wystartował, siema wariaty!");
  //console.log(botInfo);
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
  seba.stop("SIGINT");
  console.log("Seba poszedł spać!");
});
process.once("SIGTERM", () => {
  seba.stop("SIGTERM");
  console.log("Seba poszedł spać!");
});
