import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const dbName = "cine-db";

export const db = client.db(dbName);

export async function conectarDB() {
    await client.connect();

    console.log("Conexión a MongoDB Atlas exitosa");

    return client.db(dbName);
}