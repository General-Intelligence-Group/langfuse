"use server";

import { revalidatePath } from "next/cache";
import { CollectionDTO } from "../middleware/chroma/collection";
import { connectToVectorStore } from "../middleware/chroma";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth";

export async function addCollection(
  metadata: CollectionMetadata,
  thresholds: number[],
  sentenceBatchSize?: number,
  models?: string[]
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
    !metadata?.description
  )
    return;
  let headersList = {
    "Content-Type": "application/json",
  };
  const session = await getServerSession(authOptions);
  const knowledgeSetId = randomUUID();
  let bodyContent = JSON.stringify({
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
    sentence_batch_size: sentenceBatchSize || 7,
    dob_distance_threshold: thresholds[1] || 0.375,
    ssn_distance_threshold: thresholds[2] || 0.375,
    drivers_distance_threshold: thresholds[3] || 0.29,
    state_id_distance_threshold: thresholds[4] || 0.375,
    passport_number_distance_threshold: thresholds[5] || 0.375,
    account_number_distance_threshold: thresholds[6] || 0.375,
    card_number_distance_threshold: thresholds[7] || 0.375,
    username_distance_threshold: thresholds[8] || 0.375,
    email_distance_threshold: thresholds[9] || 0.375,
    bio_distance_threshold: thresholds[10] || 0.375,
    medical_distance_threshold: thresholds[11] || 0.375,
    mrn_distance_threshold: thresholds[12] || 0.29,
    insurance_distance_threshold: thresholds[13] || 0.375,
  });

  fetch("http://api:80/ingest/data", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
  // .then((response) => console.log(response))
  //     .catch((err) => `ERROR ingesting data for project ${metadata.projectId}. MESSAGE: ${console.log(err)}`);

  revalidatePath(`/project/${metadata.projectId}/knowledge/`);
  revalidatePath(`/project/${metadata.projectId}/knowledge/${knowledgeSetId}`);
}

export async function copyCollection(
  metadata: CollectionMetadata,
  sourceCollection: string
) {
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
}

export async function updateCollection(
  origin: KnowledgeCategory,
  candidate: Omit<CollectionDTO, "id">
) {
  const { name, metadata } = candidate;
  console.log("Updating candidate : ", candidate);

  const client = connectToVectorStore();
  const collection = await client.getCollection({ name });
  console.log("metadata: ", metadata);
  await collection.modify({ metadata });
  revalidatePath("/");
  revalidatePath(
    `/knowledge/${candidate.metadata.visibility}/${candidate.name}`
  );
  revalidatePath(`/knowledge/${candidate.metadata.visibility}/`);
  revalidatePath(`/knowledge/${origin}/${candidate.name}`);
  revalidatePath(`/knowledge/${origin}/`);
}
