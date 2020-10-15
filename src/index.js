
import { ApolloServer } from "apollo-server";
import resolvers from "./Graph/resolvers";
import context from './Graph/context';
import typeDefs from './Graph/typeDefs';

import ms from "ms";



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
});
// server.express.use(
//     session({
//         name: 'qid',
//         secret: `some-random-secret-here`,
//         resave: true,
//         saveUninitialized: true,
//         cookie: {
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: ms('1d'),
//         },
//     }),
// );

// server.start(() => console.log("Graphql Server Running"));
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});