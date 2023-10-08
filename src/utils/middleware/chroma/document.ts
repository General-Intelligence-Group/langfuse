import { z } from "zod";
import { type ChromaClient } from "chromadb";
// import { DocumentMetadata } from "@/src/app/knowledge/[visibility]/[collectionName]/page";
import { type Metadata } from "chromadb/dist/main/types";
import { type DocumentMetadata } from "@/src/app/project/[projectId]/knowledge/[collectionName]/page";
import { IncludeEnum } from "@/src/assets/constants";
export const metadataSchema = z.object({
  source_uuid: z.string(),
  n_token: z.number().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  n_char: z.number().optional(),
  n_people: z.number().optional(),
  publishedAt: z.string().optional(),
  source: z.string(),
  title: z.string(),
  filetype: z.string().optional(),
  filesize: z.number().optional(),
  version: z.string().optional(),
});
// Defining Entity with Zod
export const documentEntitySchema = z.object({
  source_uuid: z.string(),
  n_token: z.number().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  n_char: z.number().optional(),
  n_people: z.number().optional(),
  publishedAt: z.string().optional(),
  source: z.string(),
  title: z.string(),
  filetype: z.string().optional(),
  filesize: z.number().optional(),
  version: z.string().optional(),
});

export type DocumentEntity = DocumentMetadata;
// export type DocumentEntity = z.infer<typeof documentEntitySchema>;

// Defining Data Transfer Object (DTO) with Zod
export const documentDTOSchema = z.object({
  //   id: z.string(),
  source_uuid: documentEntitySchema.shape.source_uuid,
  n_token: documentEntitySchema.shape.n_token,
  author: documentEntitySchema.shape.author,
  category: documentEntitySchema.shape.category,
  description: documentEntitySchema.shape.description,
  n_char: documentEntitySchema.shape.n_char,
  n_people: documentEntitySchema.shape.n_char,
  publishedAt: documentEntitySchema.shape.publishedAt,
  source: documentEntitySchema.shape.source,
  title: documentEntitySchema.shape.title,
  filetype: documentEntitySchema.shape.filetype,
  filesize: documentEntitySchema.shape.filesize,
  version: documentEntitySchema.shape.version,
});

export type DocumentDTO = z.infer<typeof documentDTOSchema>;

// Applying the Companion Object Pattern
export const DocumentDTO = {
  convertFromEntity(entity: (Metadata | null)[]): DocumentDTO[] {
    const uniqueCombinations: { [key: string]: boolean } = {};

    const uniqueElements =
      entity.length > 0
        ? entity.filter((metadata) => {
            //   if (!metadata) return false;
            const combinationKey: string = `${metadata?.title}-${metadata?.version}-${metadata?.author}`;
            //   const combinationKey: string = `${metadata?.title}-${metadata?.version}-${metadata?.author}`;

            // Check if the combinationKey already exists in the uniqueCombinations object
            if (!uniqueCombinations[combinationKey]) {
              // If the combination is not found, add it to the uniqueCombinations object

              uniqueCombinations[combinationKey] = true;
              return true;
            }

            // If the combination is found, filter it out (duplicate)
            return false;
          })
        : [];
    const returnElements: DocumentDTO[] = [];
    if (uniqueElements.length > 0) {
      uniqueElements.forEach((element) => {
        // console.log(element);
        const candidate: DocumentDTO = {
          n_token: element?.n_token as number,
          n_people: element?.n_people as number,
          author: element?.author as string,
          category: element?.category as string,
          description: element?.description as string,
          n_char: element?.n_char as number,
          publishedAt: element?.publishedAt as string,
          source: element?.source as string,
          title: element?.title as string,
          filetype: element?.filetype as string,
          filesize: element?.filesize as number,
          version: element?.version as string,
          source_uuid: element?.source_uuid as string,
        };
        const passed = documentDTOSchema.parse(candidate);
        returnElements.push(passed);
      });
    }
    // console.log(returnElements);
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

export class DocumentService {
  private readonly db: ChromaClient;

  constructor(chromaClient: ChromaClient) {
    this.db = chromaClient;
  }

  private getDocumentsCollection({ name }: { name: string }) {
    return this.db.getCollection({ name });
  }

  async findDocument({
    name,
    limit,
    offset,
    metadata,
    searchString,
  }: FindProps): Promise<DocumentDTO[] | null> {
    // const entity = await this.getDocumentsDocument().findOne({
    //   id,
    // });
    const collection = await this.getDocumentsCollection({ name });

    const { metadatas, error } = await collection.get({
      where: metadata?.author ? { author: metadata?.author } : undefined,
      whereDocument: searchString ? { $contains: searchString } : undefined,
      include: [IncludeEnum.Metadatas],
      limit: limit ? limit : undefined,
      offset: offset ? offset : undefined,
    });
    // console.log(metadatas);
    const response = DocumentDTO.convertFromEntity(metadatas);
    // console.log(response);
    return !error ? response : null;
  }

  // async createDocument(
  //   dto: Omit<DocumentDTO, "id">
  // ): Promise<DocumentDTO> {
  //   const candidate = documentEntitySchema.parse({
  //     ...dto,
  //     id: randomUUID(),
  //   });
  //   const { insertedId } = await this.getDocumentsDocument().insertOne(
  //     candidate
  //   );
  //   return DocumentDTO.convertFromEntity({ ...dto, id: insertedId });
  // }

  // async updateDocument(
  //   id: string,
  //   dto: Omit<Partial<DocumentDTO>, "id">
  // ): Promise<DocumentDTO | null> {
  //   const candidate = documentEntitySchema.partial().parse(dto);

  //   const { value } = await this.getDocumentsDocument().findOneAndUpdate(
  //     { id },
  //     { $set: candidate },
  //     { returnDocument: "after" }
  //   );
  //   return value ? DocumentDTO.convertFromEntity(value) : null;
  // }

  async deleteDocument({
    name,
    title,
    author,
    version,
    publishedAt,
  }: {
    name: string;
    title: string;
    author: string;
    version: string;
    publishedAt: string;
  }): Promise<void> {
    const collection = await this.getDocumentsCollection({ name });
    await collection.delete({ where: { version, author, title, publishedAt } });
  }
}
