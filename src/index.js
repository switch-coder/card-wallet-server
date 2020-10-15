
import { ApolloServer } from "apollo-server";
import resolvers from "./Graph/resolvers.js";
import context from './Graph/context.js';
import typeDefs from './Graph/typeDefs.js';




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