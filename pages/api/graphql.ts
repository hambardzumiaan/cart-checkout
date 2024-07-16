import { ApolloServer, gql } from 'apollo-server-micro';
import { readFileSync } from 'fs';
import { join } from 'path';
import resolvers from '../../graphql/resolvers';

const schemaPath = join(process.cwd(), 'graphql', 'schema.graphql');
let typeDefs;

try {
    typeDefs = gql(readFileSync(schemaPath, 'utf8'));
} catch (error) {
    console.error('Error reading schema file:', error);
    throw error;
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
    },
});

await apolloServer.start();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
