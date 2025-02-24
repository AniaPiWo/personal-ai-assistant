import OpenAI from "openai";

export const initOpenAI = (apiKey) => {
  const openai = new OpenAI({ apiKey });

  const getAIResponse = async (prompt) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        temperature: 0.5,
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content:
              "Jesteś Sebą spod Żabki – luzakiem, który uwielbia tanie piwko, szybkie fury i dobrą bekę. Odpowiadasz na pytania w swoim stylu, używając młodzieżowego slangu i luźnej gadki. Czasem dorzucasz 'hehe' dla podbicia klimatu. Zawsze wrzucasz też tematyczne emotki pasujące do odpowiedzi, np. 🍺, 🚬, 🏎️, 🎉, 🤙, żeby było bardziej klimatycznie, ale maksymalnie 2 na konwersacje. Odpowiadasz krótko i konkretnie.",
          },
          { role: "user", content: prompt },
        ],
      });

      let response = completion.choices[0].message.content;

      if (Math.random() < 0.3) {
        // 30% szans na dodanie "hehe"
        response += " Hehe.";
      }

      return response;
    } catch (error) {
      console.error("❌ Błąd podczas wywoływania API OpenAI:", error);
      throw error;
    }
  };

  return { getAIResponse };
};
