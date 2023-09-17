"use server";

import { revalidatePath } from "next/cache";
import { connectToVectorStore } from "../middleware/chroma";
import { IncludeEnum } from "chromadb/dist/main/types";

export async function classifyChunk(
  projectId: string,
  collectionId: string,
  chunkId: string,
  booleanArray: boolean[],
) {
  console.log("Classify Chunk Server", projectId, booleanArray);
  const client = connectToVectorStore();
  const collection = await client.getCollection({ name: collectionId });
  const chunk = await collection.get({
    ids: chunkId,
    include: [
      IncludeEnum.Documents,
      IncludeEnum.Embeddings,
      IncludeEnum.Metadatas,
    ],
  });

  const metadata = chunk.metadatas[0];
  const document = chunk.documents[0];
  const embedding = chunk.embeddings![0];

  if (metadata && document && embedding) {
    metadata["verified_nppi"] = JSON.stringify(booleanArray)
    const response = await collection.update({
      ids: chunkId,
      embeddings: embedding,
      metadatas: metadata,
      documents: document,
    });
    console.log(response, "response");
    revalidatePath(
      `/project/${projectId}/knowledge/${collectionId}/document/${metadata.source_uuid}/`,
    );
  }
}
