import { Telegraf } from "telegraf";

export const initTelegramBot = (token) => {
  const seba = new Telegraf(token);

  seba.telegram.getMe().then((botInfo) => {
    console.log("✅ Seba wystartował, siema wariaty!");
    //console.log(botInfo);
  });

  return seba;
};
