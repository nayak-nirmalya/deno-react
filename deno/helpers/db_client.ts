import { MongoClient, Database } from 'https://deno.land/x/mongo/mod.ts'

let db: Database

export async function connect() {
  const client = new MongoClient()
  await client.connect(
    'mongodb+srv://nirmalya:nirmalya@cluster.a9tjk7u.mongodb.net/test-deno-todo?authMechanism=SCRAM-SHA-1',
  )

  db = client.database('test-deno-todo')
}

export function getDB() {
  return db
}
