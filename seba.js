import dotenv from "dotenv";
import { initTelegramBot } from "./services/telegram.js";
import { initOpenAI } from "./services/openai.js";

dotenv.config();

if (!process.env.OPENAI_API_KEY || !process.env.TELEGRAM_BOT_TOKEN) {
  console.error("❌ Brak wymaganych kluczy API! Sprawdź plik .env");
  process.exit(1);
}

const { getAIResponse } = initOpenAI(process.env.OPENAI_API_KEY);
const seba = initTelegramBot(process.env.TELEGRAM_BOT_TOKEN);

seba.start((ctx) => ctx.reply("Siema byku! Co tam? 😎"));
seba.help((ctx) =>
  ctx.reply("No co, hehe, pytaj śmiało! Może o dobrego browarka? 🍻")
);

seba.on("text", async (ctx) => {
  const userMessage = ctx.message.text;
  try {
    const aiResponse = await getAIResponse(userMessage);
    ctx.reply(aiResponse);
  } catch (error) {
    console.error("❌ Błąd podczas generowania odpowiedzi:", error);
    ctx.reply("Oj, coś poszło nie tak... Spróbuj jeszcze raz! 😅");
  }
});

//uruchamiamy sebe
console.log("Budzimy Sebę...");
seba.launch().catch((err) => {
  console.error("❌ Błąd podczas uruchamiania Seby:", err);
  console.error("Pełny błąd:", err.stack);
  process.exit(1);
});

process.once("SIGINT", () => {
  seba.stop("SIGINT");
  console.log("Seba poszedł spać!");
});
process.once("SIGTERM", () => {
  seba.stop("SIGTERM");
  console.log("Seba poszedł spać!");
});
