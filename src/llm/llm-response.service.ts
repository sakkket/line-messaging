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
- Be concise and accurate.
- Maximum 50 words.
- No greetings.
- No emojis.
- No markdown.
- No follow-up questions.
- If unsure, say "I don't know".
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