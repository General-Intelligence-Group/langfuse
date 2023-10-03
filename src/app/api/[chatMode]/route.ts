import { NextResponse, type NextRequest } from "next/server";
import { type Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { ChatMessageHistory, BufferMemory } from "langchain/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { connectToVectorStore } from "@/src/utils/middleware/chroma";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import { CollectionService } from "@/src/utils/middleware/chroma/collection";

export const runtime = "edge";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    messages: VercelChatMessage[];
    projectId: string;
  };
  const messages = body.messages ?? [];
  const projectId = body.projectId ?? undefined;
  if (!projectId) return new NextResponse("Forbidden", { status: 403 });
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const currentMessageContent = messages[messages.length - 1]
    ?.content as string;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const chromaClient = connectToVectorStore();
  const collectionService = new CollectionService(chromaClient);
  const collections = collectionService.getCollections(projectId);
  
  const memory = new VectorStoreRetrieverMemory({
    // 1 is how many documents to return, you might want to return more, eg. 4
    vectorStoreRetriever: vectorStore.asRetriever(1),
    memoryKey: "history",
  });

  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.8,
  });

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join("\n"),
    input: currentMessageContent,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return new StreamingTextResponse(stream);
}
