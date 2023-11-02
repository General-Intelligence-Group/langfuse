import { z } from "zod";
// import { ObjectId } from "mongodb";
import { type ChromaClient, type Collection } from "chromadb";
import { unstable_cache } from "next/cache";
// import { goldenRation } from "@/src/assets/constants";

// Define KnowledgeCategory as an enum of valid visibility values
const knowledgeCategory = {
  public: "public",
  paid: "paid",
  private: "private",
  shared: "shared",
} as const;

const VisibilitySchema = z.nativeEnum(knowledgeCategory);
export const graphConnectionSchema = z.object({
  id: z.string(),
  weight: z.number(),
});
export type GraphConnectionEntity = z.infer<typeof graphConnectionSchema>;

export const semanticSearchSchema = z.object({
  semanticInput: z.string().min(7).max(1000),
  relevanceThreshold: z.number().min(0).step(0.01).max(100).default(0),
  // .default((1 - goldenRation) * 100),
  numberOfDocs: z.number().min(0).step(0.01).max(100).default(4),
  // numberOfDocs: z.number().min(1).max(10000).step(1).default(10),
  semantic_switch_datapoint: z.boolean().default(true).optional(),
  semantic_switch_people: z.boolean().default(true),
  // relevanceThreshold: z.array(z.number().min(0).max(100)).length(1),
});
export type SemanticSearchSchemaEntity = z.infer<typeof semanticSearchSchema>;

export const knowledgeTagSchema = z.object({
  id: z.string(),
  text: z.string().max(24),
  weight: z.number().optional(),
  connections: z.array(graphConnectionSchema).optional(),
});
export type KnowledgeTagEntity = z.infer<typeof knowledgeTagSchema>;

const errorFileSchema = z.object({
  file: z.object({
    size: z.number(),
    absolute_path: z.string(),
    type: z.string(),
  }),
  error: z.string(),
});
export type ErrorFile = z.infer<typeof errorFileSchema>;
const fullNameSchema = z.object({
  title: z.string().max(32).optional(),
  firstname: z.string().max(64),
  middlenames: z.string().max(64).optional(),
  lastname: z.string().max(64),
});
export type FullName = z.infer<typeof fullNameSchema>;

const dataPointSchema = z.object({
  verified: z.boolean().nullable(),
  value: z
    .object({
      street: z.string().optional().nullable(),
      house_no: z.string().optional().nullable(),
      apartment_no: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      state: z.string().optional().nullable(),
      zip: z.string().optional().nullable(),
      country: z.string().optional().nullable(),
    })
    .or(z.string())
    .or(z.boolean())
    .or(
      z.object({
        username: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
      }),
    )
    .or(
      z.object({
        financial_account_number: z.string().optional().nullable(),
        account_pin: z.string().optional().nullable(),
        security_code: z.string().optional().nullable(),
        routing_number: z.string().optional().nullable(),
      }),
    ),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});
export type DataPoint = z.infer<typeof dataPointSchema>;

const credentialsSchema = z.object({
  verified: z.boolean().nullable(),
  value: z.object({
    username: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
  }),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});
export type Credentials = z.infer<typeof credentialsSchema>;

const payCardSchema = z.object({
  verified: z.boolean().nullable(),
  value: z.object({
    payment_card_number: z.string().optional().nullable(),
    cvv: z.string().optional().nullable(),
    expiration_date: z.string().optional().nullable(),
  }),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});
export type PaymentCard = z.infer<typeof payCardSchema>;

const addressSchema = z.object({
  verified: z.boolean().nullable(),
  value: z.object({
    street: z.string().optional().nullable(),
    house_no: z.string().optional().nullable(),
    apartment_no: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    zip: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
  }),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});
export type Address = z.infer<typeof addressSchema>;

const finAccountSchema = z.object({
  verified: z.boolean().nullable(),
  value: z.object({
    flag: z.boolean().optional().nullable(),
    financial_account_number: z.string().optional().nullable(),
    account_pin: z.string().optional().nullable(),
    security_code: z.string().optional().nullable(),
    routing_number: z.string().optional().nullable(),
  }),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});

export type FinancialAccount = z.infer<typeof finAccountSchema>;

const IdentifiedPersonSchema = z.object({
  full_name: fullNameSchema,
  date_of_birth: z.array(dataPointSchema).optional(),
  social_security_number: z.array(dataPointSchema).optional(),
  state_id_or_drivers_license: z.array(dataPointSchema).optional(),
  passport_number: z.array(dataPointSchema).optional(),
  financial_account_number: z.array(finAccountSchema).optional().nullable(),
  address: z.array(addressSchema).optional().nullable(),
  payment_card_number: z.array(payCardSchema).optional().nullable(),
  username_and_password: z.array(credentialsSchema).optional().nullable(),
  biometric_data: z.array(dataPointSchema).optional(),
  medical_information: z.array(dataPointSchema).optional(),
  medical_record_number: z.array(dataPointSchema).optional(),
  health_insurance_info: z.array(dataPointSchema).optional(),
});
export type IdentifiedPerson = z.infer<typeof IdentifiedPersonSchema>;

const ownerSchema = z
  .object({
    name: z.string(),
    id: z.string(),
  })
  .optional();
export type Owner = z.infer<typeof ownerSchema>;
export const collectionMetadataSchema = z.object({
  projectId: z.string().max(256).optional(),
  firstname: z.string().min(2).optional(),
  lastname: z.string().min(2).optional(),
  title: z.string(),
  description: z.string().max(256),
  steps: z.array(z.boolean()).optional(),
  gdriveId: z.string().min(32).max(256).optional(),
  status: z.string().max(256).optional(),
  owner: ownerSchema,
  image: z.string().optional(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  visibility: VisibilitySchema,
  embedding_model: z.string().optional(),
  analysis_step: z.boolean().default(false).optional(),
  ident_model: z.string(),
  extract_model: z.string(),
  // people: z.string().optional(),
  // error_files: z.string().optional(),
  people: z.array(IdentifiedPersonSchema).optional(),
  error_files: z.array(errorFileSchema).optional(),
  tags: z.string().optional(),
  thresholds: z.string().optional(),
  general_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  dob_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  ssn_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  drivers_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  state_id_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  passport_number_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  account_number_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  card_number_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  username_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  email_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  bio_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  medical_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  mrn_distance_threshold: z.number().min(0).max(100).step(0.01).default(10),
  insurance_distance_threshold: z
    .number()
    .min(0)
    .max(100)
    .step(0.01)
    .default(10),
  retrievalBreakPoint: z.number().min(0).default(3).optional(),
  embeddingsSize: z
    .number()
    .min(512)
    .max(1024 * 4)
    .step(1)
    .default(1024)
    .optional(),
  chunkOverlap: z.number().min(0).max(1024).default(256).optional(),
  ingestBatchSize: z.number().min(1).max(200).step(1).default(3).optional(),
  identBatchSize: z.number().min(1).max(60).step(1).default(3).optional(),
  extractBatchSize: z.number().min(1).max(40).step(1).default(3).optional(),
  // tags: z.array(knowledgeTagSchema).optional(),
});

// Now, use the CollectionEntitySchema with the collectionMetadataSchema for the metadata parameter

export type CollectionMetadataSchema = z.infer<typeof collectionMetadataSchema>;
export const collectionEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  metadata: collectionMetadataSchema,
});

// // Defining Entity with Zod
export type CollectionEntity = z.infer<typeof collectionEntitySchema>;

// Defining Data Transfer Object (DTO) with Zod
export const collectionDTOSchema = z.object({
  id: z.string(),
  name: collectionEntitySchema.shape.name,
  metadata: collectionEntitySchema.shape.metadata,
});

export type CollectionDTO = z.infer<typeof collectionDTOSchema>;

// Applying the Companion Object Pattern
export const CollectionDTO = {
  convertFromEntity(entity: Collection): CollectionDTO {
    const metadataInput: CollectionMetadata = {
      ...entity.metadata,
    } as CollectionMetadata;
    const metadata: CollectionMetadataSchema = {
      ...metadataInput,
      owner: JSON.parse(metadataInput.owner) as Owner,
      people: JSON.parse(metadataInput.people) as IdentifiedPerson[],
      error_files: JSON.parse(metadataInput.error_files) as ErrorFile[],
    };
    const candidate: CollectionDTO = {
      id: entity.id,
      name: entity.name,
      metadata,
    };
    return collectionDTOSchema.parse(candidate);
  },
};

export class CollectionService {
  private readonly db: ChromaClient;

  constructor(chromaClient: ChromaClient) {
    this.db = chromaClient;
  }

  // private getCollectionsCollection() {
  //   return this.db.getCollection<CollectionEntity>({ name });
  // }
  async getCollections(projectId: string): Promise<CollectionEntity[] | null> {
    const collections = (await this.db.listCollections()).filter(
      (col) => col && col.metadata?.projectId === projectId,
    );
    await unstable_cache(
      async () => {
        const data = (await this.db.listCollections()).filter(
          (col) => col && col.metadata?.projectId === projectId,
        );
        return data;
      },
      ["collections-list"],
      {
        tags: ["knowledge", "collections", "main-page"],
        revalidate: 10,
      },
    )();

    // const entity = await this.db.getCollection({ name });
    // return "entity ? CollectionDTO.convertFromEntity(entity) : null;"
    return collections
      ? collections.map((collection) =>
          CollectionDTO.convertFromEntity(collection as Collection),
        )
      : null;
  }
  async findCollection(name: string): Promise<CollectionDTO | null> {
    const entity = await this.db.getCollection({
      name,
      // metadata: {
      //   title: "",

      //   description: "",
      //   visibility: "public",
      // },
    });
    const convertedEntity = entity
      ? CollectionDTO.convertFromEntity(entity)
      : null;
    // console.log(convertedEntity, "convertedEntity");
    const metadata = convertedEntity?.metadata;
    const people = metadata?.people;
    // console.log(metadata, "metadata");
    if (people) console.log(people[1], "peopleLog");

    // const entity = await this.db.getCollection({ name });
    return convertedEntity && metadata
      ? { ...convertedEntity, metadata: { ...metadata } }
      : null;
    // return entity ? CollectionDTO.convertFromEntity(entity) : null;
  }

  // async createCollection(
  //   dto: Omit<CollectionDTO, "id">
  // ): Promise<CollectionDTO> {
  //   const candidate = collectionEntitySchema.parse({
  //     ...dto,
  //     id: randomUUID(),
  //   });
  //   const { insertedId } = await this.getCollectionsCollection().insertOne(
  //     candidate
  //   );
  //   return CollectionDTO.convertFromEntity({ ...dto, id: insertedId });
  // }

  // async updateCollection(
  //   id: string,
  //   dto: Omit<Partial<CollectionDTO>, "id">
  // ): Promise<CollectionDTO | null> {
  //   const candidate = collectionEntitySchema.partial().parse(dto);

  //   const { value } = await this.getCollectionsCollection().findOneAndUpdate(
  //     { id },
  //     { $set: candidate },
  //     { returnDocument: "after" }
  //   );
  //   return value ? CollectionDTO.convertFromEntity(value) : null;
  // }

  async deleteCollection(name: string): Promise<void> {
    await this.db.deleteCollection({ name });
  }
}
