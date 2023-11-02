import {
  type Collection,
  type Db,
  MongoClient,
} from "mongodb";

const uri = `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@mongodb:27017/`; // Declare MONGODB_URI in your .env file
// const options: MongoClientOptions = {
//   //   useUnifiedTopology: true,
//   //   useNewUrlParser: true,
// };

let client: MongoClient;

type Response = {
  client: MongoClient;
  db?: Db;
  collection?: Collection;
};

type InputProps = {
  dbName?: string;
  collectionName?: string;
};
export async function connectToMongoDb({ dbName, collectionName }: InputProps) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const response: Response = { client: client };

  if (dbName) {
    const db = client.db(dbName);
    response["db"] = db;
    if (collectionName) {
      response["collection"] = db.collection(collectionName);
    }
  }

  return response;
}
