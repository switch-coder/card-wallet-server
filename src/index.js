
import { ApolloServer } from "apollo-server";
import resolvers from "./Graph/resolvers.mjs";
import context from './Graph/context.mjs';
import typeDefs from './Graph/typeDefs.mjs';




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});