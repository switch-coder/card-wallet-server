
import { ApolloServer } from "apollo-server";
import resolvers from "./Graph/resolvers.js";
import context from './Graph/context.js';
import typeDefs from './Graph/typeDefs.js';
import mongoose from 'mongoose';

const startServer = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        introspection: true,
        playground: true
    });


    const uri = "";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
};

startServer();