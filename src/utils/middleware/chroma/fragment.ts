import { z } from "zod";
import { ChromaClient } from "chromadb";

// "subject": subject,
// "n_token": n_token,
// "n_char": len(document_content),
//   "lang": json.dumps(doc_langs[0]),

import { IncludeEnum, Metadata } from "chromadb/dist/main/types";
import { DocumentMetadata } from "@/src/app/project/[projectId]/knowledge/[collectionName]/page";
export const fragmentMetadataSchema = z.object({
  author: z.string().optional(),
  file_directory: z.string().optional(),
  subject: z.string().optional(),
  n_token: z.string().optional(),
  n_char: z.string().optional(),
  lang: z.string().optional(),
  filename: z.string().optional(),
  last_modified: z.string().optional(),
  people: z.string().optional(),
  semantic_triggers: z.string().optional(),
  source: z.string(),
  id: z.string(),
  source_uuid: z.string(),
  title: z.string(),
  filetype: z.string().optional(),
  sent_from: z.string().optional(),
  sent_to: z.string(),
});
export type FragmentMetadataEntity = z.infer<typeof fragmentMetadataSchema>;

export const fragmentSchema = z.object({
  metadata: z.object({
    author: z.string().optional(),
    file_directory: z.string().optional(),
    subject: z.string().optional(),
    n_token: z.string().optional(),
    n_char: z.string().optional(),
    lang: z.string().optional(),
    filename: z.string().optional(),
    last_modified: z.string().optional(),
    source_uuid: z.string(),
    source: z.string(),
    people: z.string().optional(),
    semantic_triggers: z.string().optional(),
    id: z.string(),
    title: z.string(),
    filetype: z.string().optional(),
    sent_from: z.string().optional(),
    sent_to: z.string(),
  }),
  pageContent: z.string(),
});
// Defining Entity with Zod
export const fragmentEntitySchema = z.object({
  metadata: z.object({
    author: z.string().optional(),
    file_directory: z.string().optional(),
    subject: z.string().optional(),
    n_token: z.string().optional(),
    n_char: z.string().optional(),
    lang: z.string().optional(),
    filename: z.string().optional(),
    last_modified: z.string().optional(),
    source_uuid: z.string(),
    people: z.string().optional(),
    semantic_triggers: z.string().optional(),
    id: z.string(),
    source: z.string(),
    title: z.string(),
    filetype: z.string().optional(),
    sent_from: z.string().optional(),
    sent_to: z.string(),
  }),
  pageContent: z.string(),
});

// export type FragmentEntity = DocumentMetadata;
export type FragmentEntity = z.infer<typeof fragmentEntitySchema>;

// Defining Data Transfer Object (DTO) with Zod
export const fragmentDTOSchema = z.object({
  //   id: z.string(),
  metadata: fragmentEntitySchema.shape.metadata,
  pageContent: fragmentEntitySchema.shape.pageContent,
});

export type FragmentDTO = z.infer<typeof fragmentDTOSchema>;

// Applying the Companion Object Pattern
export const FragmentDTO = {
  convertFromEntity(
    metadatas: (Metadata | null)[],
    fragments: (string | null)[]
  ): FragmentDTO[] {
    const returnElements: FragmentDTO[] = [];
    if (metadatas.length === fragments.length && metadatas.length > 0) {
      fragments.forEach((doc, idx) => {
        if (doc) {
          returnElements.push({
            pageContent: doc,
            metadata: metadatas[idx] as FragmentMetadataEntity,
          });
        }
      });
    }

    return returnElements;
  },
};

type FindProps = {
  name: string;
  searchString?: string;
  title?: string;
  offset?: number;
  limit?: number;
  metadata?: DocumentMetadata;
};
type GetProps = {
  collectionName: string;
  title?: string;
  author?: string;
  source?: string;
  offset?: number;
  limit?: number;
  source_uuid: string;
};

export class FragmentService {
  private readonly db: ChromaClient;

  constructor(chromaClient: ChromaClient) {
    this.db = chromaClient;
  }

  private getDocumentsCollection({ name }: { name: string }) {
    return this.db.getCollection({ name });
  }

  async getFragments({
    collectionName,
    title,
    source,
    limit,
    offset,
    source_uuid,
  }: GetProps): Promise<FragmentDTO[] | null> {
    // console.log("Getting Fragments ... ");
    // console.log("collectionName: ", collectionName);
    // console.log("title: ", title);
    // console.log("author: ", author);
    // console.log("source: ", source);

    const collection = await this.getDocumentsCollection({
      name: collectionName,
    });
    // console.log("collection: ", collection);

    const { metadatas, documents, error } = await collection.get({
      where: {
        source_uuid,
        // $and: [
        //   { source: { $eq: source } },
        //   { author: { $eq: author } },
        //   { title: { $eq: title } },
        // ],
      },
      include: [IncludeEnum.Metadatas, IncludeEnum.Documents],
      limit: limit ? limit : undefined,
      offset: offset ? offset : undefined,
    });
    // console.log(metadatas, "First response");
    const response = FragmentDTO.convertFromEntity(metadatas, documents);
    return !error ? response : null;
  }

  async findFragment({
    name,
    title,
    limit,
    offset,
    metadata,
    searchString,
  }: FindProps): Promise<FragmentDTO[] | null> {
    const collection = await this.getDocumentsCollection({ name });

    const { documents, metadatas, error } = await collection.get({
      where: metadata?.author ? { author: metadata?.author } : undefined,
      whereDocument: searchString ? { $contains: searchString } : undefined,
      include: [IncludeEnum.Metadatas],
      limit: limit ? limit : undefined,
      offset: offset ? offset : undefined,
    });
    // console.log(metadatas);
    const response = FragmentDTO.convertFromEntity(metadatas, documents);
    console.log(response);
    return !error ? response : null;
  }

  // async createFragment(
  //   dto: Omit<FragmentDTO, "id">
  // ): Promise<FragmentDTO> {
  //   const candidate = fragmentEntitySchema.parse({
  //     ...dto,
  //     id: randomUUID(),
  //   });
  //   const { insertedId } = await this.getDocumentsDocument().insertOne(
  //     candidate
  //   );
  //   return FragmentDTO.convertFromEntity({ ...dto, id: insertedId });
  // }

  // async updateFragment(
  //   id: string,
  //   dto: Omit<Partial<FragmentDTO>, "id">
  // ): Promise<FragmentDTO | null> {
  //   const candidate = fragmentEntitySchema.partial().parse(dto);

  //   const { value } = await this.getDocumentsDocument().findOneAndUpdate(
  //     { id },
  //     { $set: candidate },
  //     { returnDocument: "after" }
  //   );
  //   return value ? FragmentDTO.convertFromEntity(value) : null;
  // }

  async deleteFragment({
    name,
    title,
    author,
    sent_to,
    last_modified,
  }: {
    name: string;
    title: string;
    author: string;
    sent_to: string;
    last_modified: string;
  }): Promise<void> {
    const collection = await this.getDocumentsCollection({ name });
    await collection.delete({
      where: { sent_to, author, title, last_modified },
    });
  }
}
