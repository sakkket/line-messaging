import { Injectable, Logger } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import {
  AIMessage,
  HumanMessage,
} from '@langchain/core/messages';

type ChatMessage = {
  role: string;
  content: string;
};

@Injectable()
export class LlmResponseService {
  private readonly logger = new Logger(LlmResponseService.name);
  private readonly conversationHistory = new Map<
  string,
  ChatMessage[]
>();

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
- Use conversation history when relevant.
- If unsure, say:
  "I'm not sure about that, and I'd rather not guess."
    `,
  ],
  ['placeholder', '{history}'],
  ['human', '{question}'],
]);

async generateResponse(
  question: string,
  userId: string,
): Promise<string> {
  try {
    const chain = this.prompt.pipe(this.llm);

    const history =
      this.conversationHistory.get(userId) ?? [];

    const historyMessages = history.map((message) =>
      message.role === 'user'
        ? new HumanMessage(message.content)
        : new AIMessage(message.content),
    );

    const response = await chain.invoke({
      question,
      history: historyMessages,
    });

    const answer = String(response.content);

    const updatedHistory = [
      ...history,
      {
        role: 'user',
        content: question,
      },
      {
        role: 'assistant',
        content: answer,
      },
    ].slice(-6); // 3 user + 3 assistant messages

    this.conversationHistory.set(
      userId,
	  updatedHistory
    );

    return answer;
  } catch (error) {
    this.logger.error(
      'Failed to generate LLM response',
      error,
    );

    return 'Sorry, I am unable to process your request right now.';
  }
}
}