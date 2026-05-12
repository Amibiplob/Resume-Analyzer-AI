import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

export async function getDb(): Promise<Db> {
  if (!global._mongoClient) {
    client = new MongoClient(uri);
    await client.connect();
    global._mongoClient = client;
  }
  return global._mongoClient.db(process.env.MONGODB_DB || "resume_ai");
}
