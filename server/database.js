import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

export const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
      console.log("Connected To DB");
    } catch (error) {
      console.log(error);
    }
  }
  return client;
};
export const getConnectionClient = () => client;

// exports = {
//   connectToMongoDB,
//   getConnectionClient,
// };
