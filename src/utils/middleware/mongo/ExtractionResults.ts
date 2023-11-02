import { z } from "zod";
import { ObjectId } from "mongodb";
const dataPointSchema = z.object({
  verified: z.boolean().nullable(),
  value: z.string().or(z.boolean()).or(z.number()),
  chunk_source: z.string(),
  document_source: z.string(),
  observation: z.string(),
  trace: z.string(),
  relevance_distance: z.number().optional(),
  relevance_score: z.number().optional(),
});
export type DataPoint = z.infer<typeof dataPointSchema>;

const fullNameSchema = z.object({
  pre: z.string().max(32).optional(),
  fn: z.string().max(64),
  mn: z.string().max(64).optional(),
  ln: z.string().max(64),
});
export type FullName = z.infer<typeof fullNameSchema>;

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

export const resultEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  name: fullNameSchema,
  dob: z.array(dataPointSchema).optional(),
  ssn: z.array(dataPointSchema).optional(),
  id: z.array(dataPointSchema).optional(),
  pass: z.array(dataPointSchema).optional(),
  acc: z.array(finAccountSchema).optional(),
  address: z.array(addressSchema).optional(),
  pay: z.array(payCardSchema).optional(),
  cred: z.array(credentialsSchema).optional(),
  bio: z.array(dataPointSchema).optional(),
  med: z.array(dataPointSchema).optional(),
  mrn: z.array(dataPointSchema).optional(),
  health: z.array(dataPointSchema).optional(),
});

export type ResultEntity = z.infer<typeof resultEntitySchema>;

export const resultDTOSchema = z.object({
  id: z.string(),
  name: resultEntitySchema.shape.name,
  dob: resultEntitySchema.shape.dob,
  ssn: resultEntitySchema.shape.ssn,
  stateId: resultEntitySchema.shape.id,
  pass: resultEntitySchema.shape.pass,
  address: resultEntitySchema.shape.address,
  acc: resultEntitySchema.shape.acc,
  pay: resultEntitySchema.shape.pay,
  cred: resultEntitySchema.shape.cred,
  bio: resultEntitySchema.shape.bio,
  med: resultEntitySchema.shape.med,
  mrn: resultEntitySchema.shape.mrn,
  health: resultEntitySchema.shape.health,
});

export type ResultDTO = z.infer<typeof resultDTOSchema>;

export const ResultDTO = {
  convertFromEntity(entity: ResultEntity): ResultDTO {
    const candidate: ResultDTO = {
      id: entity._id.toHexString(),
      name: entity.name,
      dob: entity.dob,
      ssn: entity.ssn,
      stateId: entity.id,
      pass: entity.pass,
      address: entity.address,
      acc: entity.acc,
      pay: entity.pay,
      cred: entity.cred,
      bio: entity.bio,
      med: entity.med,
      mrn: entity.mrn,
      health: entity.health,
    };
    return resultDTOSchema.parse(candidate);
  },
};
import { type MongoClient, type Db } from "mongodb";
type InputProps = {
  sessionId: string;
  filtered?: boolean;
};

export class ResultService {
  private readonly db: Db;

  constructor(mongoClient: MongoClient, dbName: string) {
    this.db = mongoClient.db(dbName);
  }

  private getResultsCollection() {
    return this.db.collection<ResultEntity>("extraction_results");
  }

  async getResults({
    sessionId,
    filtered = false,
  }: InputProps): Promise<ResultDTO[]> {
    const entities = await this.getResultsCollection()
      .find({ sessionId })
      .toArray();
    const response = entities.map((entity) =>
      ResultDTO.convertFromEntity(entity),
    );
    return response
      ? filtered
        ? response.filter(
            (dp) =>
              dp.dob ||
              dp.ssn ||
              dp.pass ||
              dp.pay ||
              dp.cred ||
              dp.stateId ||
              dp.bio ||
              dp.health ||
              dp.mrn ||
              dp.med ||
              dp.address ||
              dp.acc,
          )
        : response
      : [];
  }

  async findResult(id: string): Promise<ResultDTO | null> {
    const entity = await this.getResultsCollection().findOne({
      _id: new ObjectId(id),
    });
    return entity ? ResultDTO.convertFromEntity(entity) : null;
  }

  async createResult(dto: Omit<ResultDTO, "id">): Promise<ResultDTO> {
    const candidate = resultEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
    });
    const { insertedId } =
      await this.getResultsCollection().insertOne(candidate);
    return ResultDTO.convertFromEntity({ ...dto, _id: insertedId });
  }

  async updateResult(
    id: string,
    dto: Omit<Partial<ResultDTO>, "id">,
  ): Promise<ResultDTO | null> {
    const candidate = resultEntitySchema.partial().parse(dto);

    const { value } = await this.getResultsCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: candidate },
      { returnDocument: "after" },
    );
    return value ? ResultDTO.convertFromEntity(value) : null;
  }

  async deleteResult(id: string): Promise<void> {
    await this.getResultsCollection().deleteOne({ _id: new ObjectId(id) });
  }
}
