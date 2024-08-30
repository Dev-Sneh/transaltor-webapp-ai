"use server";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const parser = new StringOutputParser();
const model = new ChatOpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
  model: "gpt-3.5-turbo",
});

export async function translate(_: any, formData: FormData) {
  const startingLanguage = formData.get("startingLanguage");
  const endLanguage = formData.get("endLanguage");
  const text = formData.get("text");

  const systemTemplate =
    "Translate the following from {startingLanguage} into {endLanguage}:";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);

  const chain = promptTemplate.pipe(model).pipe(parser);
  const result = await chain.invoke({
    startingLanguage,
    endLanguage,
    text,
  });

  return {
    message: result,
  };
}
