"use server";
// import { Chroma } from "langchain/vectorstores/chroma";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  CollectionMetadataSchema,
  type CollectionDTO,
  // SemanticSearchSchemaEntity,
} from "../middleware/chroma/collection";
import { connectToVectorStore } from "../middleware/chroma";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth";
// type Props = SemanticSearchSchemaEntity & {
//   peopleTags: MultiSelectTagDefault[];
//   fileTypeTags: MultiSelectTagDefault[];
//   collectionTags: MultiSelectCollectionTag[];
// };
// export async function semanticSearch({ collectionTags }: Props) {
//   console.log("Server action SemanticSearch ... ");
//   collectionTags.map(async (collection) => {
//     const embeddings = new OpenAIEmbeddings({
//       azureOpenAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
//       azureOpenAIApiVersion: process.env.OPENAI_API_VERSION, // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
//       azureOpenAIApiInstanceName: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
//       azureOpenAIApiDeploymentName: "{DEPLOYMENT_NAME}", // In Node.js defaults to process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME
//     });
//     const vectorStore = await Chroma.fromExistingCollection(
//       embeddings,
//       { collectionName: "godel-escher-bach" },
//     );
//   });
// }

type BatchInput = {
  ingestBatchSize?: number;
  identBatchSize?: number;
  extractBatchSize?: number;
};
export async function addCollection(
  metadata: CollectionMetadataSchema,
  thresholds: number[],
  gdriveId?: string,
  analysis_step?: boolean,
  retrievalBreakPoint?: number,
  embeddingsSize?: number,
  chunkOverlap?: number,
  models?: string[],
  batching?: BatchInput,
) {
  console.log("Server action addCollection ... ", thresholds);
  // const client = connectToVectorStore();
  // await client.createCollection({
  //   name: randomUUID(),
  //   metadata,
  // });
  if (
    !metadata ||
    !metadata?.projectId ||
    !metadata?.title ||
    !metadata?.visibility ||
    !metadata?.description ||
    !gdriveId
  )
    return;
  const headersList = {
    "Content-Type": "application/json",
  };
  const session = await getServerSession(authOptions);
  const knowledgeSetId = randomUUID();
  const bodyContent = JSON.stringify({
    gdrive_id: gdriveId,
    // model: "gpt-3",
    model: "gpt-4",
    models: models || ["gpt-4", "gpt-4"],
    // model: "gpt-3.5-turbo-0613",
    share:
      "https://drive.google.com/drive/folders/1mkW3UBDNHJlYWKS3GI2s16cjxsryGj5m?usp=sharing",
    project: metadata.projectId,
    owner: session?.user,
    title: metadata.title,
    description: metadata.description,
    visibility: metadata.visibility,
    session_id: knowledgeSetId,
    lf_priv: "sk-lf-9f9a94f6-2067-4880-a07a-6390da096aa6",
    lf_pub: "pk-lf-2a10b2aa-049e-4c4e-b9f7-34f9b19f20e6",
    analysis_step: analysis_step || false,
    retrieval_break_point: retrievalBreakPoint || 3,
    embeddings_size: embeddingsSize || 1024,
    chunk_overlap: chunkOverlap || 256 + 128,
    dob_distance_threshold: thresholds[1],
    ssn_distance_threshold: thresholds[2],
    drivers_distance_threshold: thresholds[3],
    state_id_distance_threshold: thresholds[4],
    passport_number_distance_threshold: thresholds[5],
    account_number_distance_threshold: thresholds[6],
    card_number_distance_threshold: thresholds[7],
    username_distance_threshold: thresholds[8],
    email_distance_threshold: thresholds[9],
    bio_distance_threshold: thresholds[10],
    medical_distance_threshold: thresholds[11],
    mrn_distance_threshold: thresholds[12],
    insurance_distance_threshold: thresholds[13],
    ingest_batch_size: batching?.ingestBatchSize || 3,
    ident_batch_size: batching?.identBatchSize || 3,
    extract_batch_size: batching?.extractBatchSize || 3,
  });

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  const response = await fetch("http://api:80/ingest/data", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
  const data = (await response.json()) as {
    session_id: string;
    project_id: string;
  };
  revalidatePath(`project/${data.project_id}/knowledge`);
  revalidatePath(`project/${data.project_id}/knowledge/${data.session_id}`);
  revalidateTag("collections-list");
  revalidateTag("collections");
  return data;
}

export async function copyCollection(metadata: CollectionMetadata) {
  const client = connectToVectorStore();
  await client.createCollection({
    name: randomUUID(),
    metadata,
  });

  revalidatePath("/");
}

export async function deleteCollection(name: string) {
  const client = connectToVectorStore();
  await client.deleteCollection({
    name,
  });

  revalidatePath("/");
  revalidateTag("collections-list");
  revalidateTag("collections");
}

export async function updateCollection(
  origin: KnowledgeCategory,
  candidate: Omit<CollectionDTO, "id">,
) {
  const { name, metadata } = candidate;
  console.log("Updating candidate : ", candidate);

  const client = connectToVectorStore();
  const collection = await client.getCollection({ name });
  console.log("metadata: ", metadata);
  await collection.modify({ metadata });
  revalidatePath("/");
  revalidatePath(
    `/knowledge/${candidate.metadata.visibility}/${candidate.name}`,
  );
  revalidatePath(`/knowledge/${candidate.metadata.visibility}/`);
  revalidatePath(`/knowledge/${origin}/${candidate.name}`);
  revalidatePath(`/knowledge/${origin}/`);
}
