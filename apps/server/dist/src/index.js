import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// Here we import the automatically generated Book type, so we can use it in our
// context typing.
import resolvers from './resolvers/index.js';
import { readFileSync } from 'fs';
import { TreeDataSource } from './DataSources/TreeDataSource.js';
import { BranchDataSource } from './DataSources/BranchDataSources.js';
import { LeafDataSource } from './DataSources/LeafDataSource.js';
import { MarkDownDataSource } from './DataSources/MarkdownDataSource.js';
// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            // We are using a static data set for this example, but normally
            // this would be where you'd add your data source connections
            // or your REST API classes.
            dataSources: {
                TreesAPI: new TreeDataSource(),
                BranchesAPI: new BranchDataSource(),
                LeavesAPI: new LeafDataSource(),
                MarkDownAPI: new MarkDownDataSource(),
            },
        };
    },
});
console.log(`🚀 Server listening at: ${url}`);
