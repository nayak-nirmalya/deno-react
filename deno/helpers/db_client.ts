import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts'

let db: Database

export function connect() {
  const client = new MongoClient()
  client.connectWithUri(
    'mongodb+srv://nirmalya:nirmalya@cluster.a9tjk7u.mongodb.net/',
  )

  db = client.database('test-deno-todo')
}

export function getDB() {
  return db
}
