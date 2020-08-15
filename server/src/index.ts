import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import { UserResolver } from "./resolvers/UserResolver";

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [BookResolver, UserResolver]
  })
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  })
  await server.listen(4000)
  console.log("Server has started!")
}

main();