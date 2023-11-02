import { z } from "zod";
import { ObjectId } from "mongodb";

const fullNameSchema = z.object({
  pre: z.string().max(32).optional(),
  fn: z.string().max(64),
  mn: z.string().max(64).optional(),
  ln: z.string().max(64),
});
export type FullName = z.infer<typeof fullNameSchema>;

const personSchema = z.object({
  name: fullNameSchema,
});

export type IdentifiedPersonOnDoc = z.infer<typeof personSchema>;

const langSchema = z.object({
  locale: z.string(),
  charset: z.string(),
  probability: z.number().nullable().optional(),
});

export type IdentifiedLang = z.infer<typeof langSchema>;

export const documentEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  filesize: z.number(),
  filename: z.string(),
  source_uuid: z.string(),
  title: z.string(),
  file_directory: z.string(),
  last_modified: z.string(),
  filetype: z.string(),
  page_number: z.string(),
  page_name: z.string(),
  url: z.string(),
  sent_from: z.string(),
  sent_to: z.string(),
  subject: z.string(),
  section: z.string(),
  n_token: z.number(),
  n_char: z.number(),
  n_people: z.number(),
  sessionId: z.string(),
  lang: langSchema,
  people: z.array(personSchema),
});

export type DocumentEntity = z.infer<typeof documentEntitySchema>;

export const documentDTOSchema = z.object({
  id: z.string(),
  filesize: z.number(),
  filename: z.string(),
  sessionId: z.string(),
  source_uuid: z.string(),
  title: z.string(),
  file_directory: z.string(),
  last_modified: z.string(),
  filetype: z.string(),
  page_number: z.number(),
  page_name: z.string(),
  url: z.string(),
  sent_from: z.string().optional(),
  sent_to: z.string().optional(),
  subject: z.string().optional(),
  section: z.string(),
  n_token: z.number(),
  n_char: z.number(),
  n_people: z.number(),
  lang: langSchema,
  people: z.array(personSchema),
});

export type DocumentDTO = z.infer<typeof documentDTOSchema>;

export const DocumentDTO = {
  convertFromEntity(entity: DocumentEntity): DocumentDTO {
    const candidate: DocumentDTO = {
      id: entity._id.toHexString(),
      filesize: entity.filesize,
      filename: entity.filename,
      sessionId: entity.sessionId,
      source_uuid: entity.source_uuid,
      title: entity.title,
      file_directory: entity.file_directory,
      last_modified: entity.last_modified,
      // last_modified: new Date(entity.last_modified),
      filetype: entity.filetype,
      page_number: isNaN(parseInt(entity.page_number))
        ? 1
        : parseInt(entity.page_number),
      page_name: entity.page_name,
      url: entity.url,
      sent_from: entity.sent_from,
      sent_to: entity.sent_to,
      subject: entity.subject,
      section: entity.section,
      n_token: entity.n_token,
      n_char: entity.n_char,
      n_people: entity.n_people,
      lang: entity.lang,
      people: entity.people,
    };
    return documentDTOSchema.parse(candidate);
  },
};
import { type MongoClient, type Db } from "mongodb";
type InputProps = {
  sessionId: string;
  sourceId: string;
};

export class DocumentService {
  private readonly db: Db;

  constructor(mongoClient: MongoClient, dbName: string) {
    this.db = mongoClient.db(dbName);
  }

  private getDocumentCollection() {
    return this.db.collection<DocumentEntity>("documents");
  }

  async getDocument({
    sessionId,
    sourceId,
  }: InputProps): Promise<DocumentDTO | null> {
    // const entity = await this.getDocumentCollection().findOne({});
    const entity = await this.getDocumentCollection().findOne({
      sessionId: sessionId,
      source_uuid: sourceId,
    });
    return entity ? DocumentDTO.convertFromEntity(entity) : null;
  }

  //   async findDocument(id: string): Promise<DocumentDTO | null> {
  //     const entity = await this.getDocumentCollection().findOne({
  //       _id: new ObjectId(id),
  //     });
  //     return entity ? DocumentDTO.convertFromEntity(entity) : null;
  //   }

  //   async createDocument(dto: Omit<DocumentDTO, "id">): Promise<DocumentDTO> {
  //     const candidate = documentEntitySchema.parse({
  //       ...dto,
  //       _id: new ObjectId(),
  //     });
  //     const { insertedId } =
  //       await this.getDocumentCollection().insertOne(candidate);
  //     return DocumentDTO.convertFromEntity({ ...dto, _id: insertedId });
  //   }

  //   async updateDocument(
  //     id: string,
  //     dto: Omit<Partial<DocumentDTO>, "id">,
  //   ): Promise<DocumentDTO | null> {
  //     const candidate = documentEntitySchema.partial().parse(dto);

  //     const { value } = await this.getDocumentCollection().findOneAndUpdate(
  //       { _id: new ObjectId(id) },
  //       { $set: candidate },
  //       { returnDocument: "after" },
  //     );
  //     return value ? DocumentDTO.convertFromEntity(value) : null;
  //   }

  //   async deleteDocument(id: string): Promise<void> {
  //     await this.getDocumentCollection().deleteOne({ _id: new ObjectId(id) });
  //   }
}
