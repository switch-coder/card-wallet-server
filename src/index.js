
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


    const uri = "mongodb+srv://switch-coder:YCO1yS9inwdMJUN0@cluster0.15feh.mongodb.net/<dbname>?retryWrites=true&w=majority";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });




    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
};

startServer();