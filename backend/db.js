import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
let db;

// Function to connect to the MongoDB database
export async function connectToDb() {
  try {
    await client.connect();
    db = client.db("jaMoveo"); // Using your actual DB name "Code-togetherDB"
    console.log("Connected to Jamoveo!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }
  return db;
}
