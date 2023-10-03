/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { OpenAIEmbeddingFunction } from "chromadb";
// const embedder = new OpenAIEmbeddingFunction({
//   openai_api_key="sk-dummy-api-key",
//   openai_model=""
//   // api_base="http://localai:8080/v1",
//   // # api_type="azure",
//   // api_type="openai",
//   // api_version="2023-05-15",
//   // # api_version="2023-07-01-preview",
//   // model_name="text-embedding-ada-002",
// });

import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { LangChainStream, type Message as VercelChatMessage } from "ai";
// import { LLMChain } from "langchain/chains";

// import { ChatOpenAI } from "langchain/chat_models/openai";
// import {
//   ChatPromptTemplate,
//   SystemMessagePromptTemplate,
//   HumanMessagePromptTemplate,
// } from "langchain/prompts";

// const template =
//   "Your name is PrismaAI. You are a helpful assistant here to answers user queries with provided documents. Do NOT make up information. Only use the information provided in the documents!";
// const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
// const docTemplate = `
// Documents:
// ##########
// {documents}
// ##########`;
// const docMessagePrompt = HumanMessagePromptTemplate.fromTemplate(docTemplate);
// const humanTemplate = `
// User input:
// ##########
// {input}
// ##########`;
// const humanMessagePrompt =
//   HumanMessagePromptTemplate.fromTemplate(humanTemplate);

// const chatPrompt = ChatPromptTemplate.fromMessages([
//   systemMessagePrompt,
//   docMessagePrompt,
//   humanMessagePrompt,
// ]);

import { Button } from "@/src/components/ui/button";
// import { connectToVectorStore } from "@/src/utils/middleware/chroma";
// import { redirect } from "next/navigation";

// import { OpenAIStream } from "ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { formatNumberToPercent } from "@/src/utils/helper";
import { type CollectionType } from "chromadb/dist/main/types";
import Link from "next/link";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/src/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";

if (!process.env.OPENAI_API_KEY_1 && !!process.env.OPENAI_API_KEY_2) {
  throw new Error("No OPENAI_API_KEY");
} else {
  console.log(
    "OPENAI_API_KEY_1 = ",
    `${process.env.OPENAI_API_KEY_1?.slice(0, 13)} ...`,
  );
  console.log(
    "OPENAI_API_KEY_2 = ",
    `${process.env.OPENAI_API_KEY_2?.slice(0, 13)} ...`,
  );
}
if (!process.env.OPENAI_API_VERSION) {
  throw new Error("No OPENAI_API_VERSION");
} else {
  console.log("OPENAI_API_VERSION = ", process.env.OPENAI_API_VERSION);
}
if (!process.env.OPENAI_API_BASE) {
  throw new Error("No OPENAI_API_BASE");
} else {
  console.log("OPENAI_API_BASE = ", process.env.OPENAI_API_BASE);
}
if (!process.env.OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME) {
  throw new Error("No OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME");
} else {
  console.log(
    "OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME = ",
    process.env.OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME,
  );
}
if (!process.env.VECTOR_STORE_HOST_PATH) {
  throw new Error("No VECTOR_STORE_HOST_PATH");
} else {
  console.log("VECTOR_STORE_HOST_PATH = ", process.env.VECTOR_STORE_HOST_PATH);
}



async function SearchResult({
  queryParams,
  collections,
  projectId,
}: {
  queryParams: SemanticSearchParams;
  collections: CollectionType[];
  projectId: string;
}) {
  if (!queryParams) return <div>No query provided</div>;
  const { q, ds, ft, p, limit } = queryParams;
  const relevance = queryParams.relevance
    ? parseFloat(queryParams.relevance) / 100
    : 0;
  console.log("q", typeof q, q);
  console.log("ds", typeof ds, ds);
  console.log("ft", typeof ft, ft);
  console.log("p", typeof p, p);
  const datasetStrings = ds?.split(",");
  //         .map((dataset) =>
  //     dataset.split("_").map((datapoint) => ({
  //       collectionId: datapoint[0],
  //       collectionTitle: datapoint[1],
  //     })),
  //   );
  //   if (!datasets) redirect(``);
  console.log("datasetStrings", typeof datasetStrings, datasetStrings);
  //   if (!datasetStrings) redirect(`/search`);
  const datasets: { id: string; title: string }[] | undefined =
    datasetStrings?.map((datasetString) => {
      const [id, title] = datasetString.split("_");

      return { id: id!, title: title! };
    });
  if (!datasets) return;
  // const chat = new ChatOpenAI({
  //   temperature: 0,
  // });

  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const chain = new LLMChain({
  //   llm: chat,
  //   prompt: chatPrompt,
  // });

  //   embedding_function = OpenAIEmbeddings(

  //     deployment="",
  //     model="text-embedding-ada-002",
  //     openai_api_base="http://localai:8080/v1",
  //     openai_api_type="openai",
  //     openai_api_version="2023-05-15",
  //     chunk_size=16,
  // )
  // chroma_embedding_fnc = embedding_functions.OpenAIEmbeddingFunction(
  //     api_base="http://localai:8080/v1",
  //     # api_type="azure",
  //     api_type="openai",
  //     api_version="2023-05-15",
  //     # api_version="2023-07-01-preview",
  //     model_name="text-embedding-ada-002",

  // )

  const semanticResponse = await Promise.all(
    datasets.map(async ({ id }) => {
      // Create vector store and index the docs
      const chroma_collection = collections.find(
        (collection) => collection.name === id,
      );

      const vectorStore = await Chroma.fromExistingCollection(
        new OpenAIEmbeddings({
          azureOpenAIApiKey: "sk-dummy", // In Node.js defaults to process.env.OPENAI_API_KEY
          azureOpenAIBasePath: "http://localai:8080/v1/engines",
          azureOpenAIApiVersion: "2023-05-15",
          azureOpenAIApiDeploymentName: "text-embedding-ada-002",
          // modelName: "text-embedding-ada-002",
          batchSize: 64, // Default value if omitted is 512. Max is 2048
        }),
        {
          collectionName: id,
          url: process.env.VECTOR_STORE_HOST_PATH, // Optional, will default to this value

          collectionMetadata: chroma_collection?.metadata as Record<
            string,
            unknown
          >,
        },
      );

      // You can also filter by metadata
      if (!q) return;
      // const response = await collection.query({ queryTexts: q, include: [IncludeEnum.Documents, IncludeEnum.Metadatas, IncludeEnum.Distances] })
      // console.log("response", response)
      const response = await vectorStore.similaritySearchWithScore(
        q,
        limit ? parseInt(limit) : 500,
        {
          //   id: 1,
        },
      );
      // response.map((response) => console.log(response[1]));
      const filteredResponse = response
        .filter((item) => item && item[1] < 1 - relevance)
        .map((item) => ({ document: item[0], score: item[1], datasetId: id }));

      return filteredResponse;
    }),
  );
  return (
    <div>
      <div>
        <Button type="button">Open Chat</Button>
      </div>
      {semanticResponse &&
        semanticResponse.map((datasetResults, datasetIndex) => (
          <Table key={datasetIndex}>
            <TableCaption>Semantic Search Result</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Metadata</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasetResults &&
                datasetResults.map(
                  (
                    {
                      document: {
                        metadata: { source_uuid, filename, filetype },
                        pageContent,
                      },
                      score,
                      datasetId,
                    },
                    index,
                  ) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger asChild>
                        <TableRow>
                          <TableCell className="text-left">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            {formatNumberToPercent({
                              numberToFormat: 1 - score,
                            })}
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Badge>{filename}</Badge>
                            <Badge>{filetype}</Badge>
                          </TableCell>
                          <TableCell>
                            <Link
                              title="Go to Document"
                              target="_blank"
                              href={`/project/${projectId}/knowledge/${datasetId}/document/${source_uuid}`}
                            >
                              <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-96">
                        <div className="flex justify-between space-x-4">
                          <div></div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">Content</h4>
                            <p className="text-sm">{pageContent}</p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                Document Chunk
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ),
                )}
            </TableBody>
          </Table>
        ))}
    </div>
  );
}

export default SearchResult;