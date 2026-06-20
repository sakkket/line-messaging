import { Injectable, Logger } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';

@Injectable()
export class LlmResponseService {
  private readonly logger = new Logger(LlmResponseService.name);

  private readonly llm = new ChatOllama({
    baseUrl: 'http://localhost:11434',
    model: 'gemma3:1b',
    temperature: 0.5,
  });

  private readonly prompt = ChatPromptTemplate.fromMessages([
   [
   'system',
    `
You are Saket Labs Assistant.

Rules:
- Answer directly.
- Do not start responses with:
  "Okay", "Sure", "Alright", "Certainly", "Of course".
- Do not add introductions.
- Maximum 50 words.
- Be concise and accurate.
- If unsure, say:
  "I'm not sure about that, and I'd rather not guess."
    `,
  ],
  ['human', '{question}'],
]);

  async generateResponse(question: string): Promise<string> {
    try {
      const chain = this.prompt.pipe(this.llm);

      const response = await chain.invoke({
        question,
      });

      return String(response.content);
    } catch (error) {
      this.logger.error('Failed to generate LLM response', error);

      return 'Sorry, I am unable to process your request right now.';
    }
  }
}