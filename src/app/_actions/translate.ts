"use server";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";


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
