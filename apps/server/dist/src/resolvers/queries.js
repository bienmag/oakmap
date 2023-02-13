// Use the generated `QueryResolvers` type to type check our queries!
const queries = {
    Query: {
        // Our third argument (`contextValue`) has a type here, so we
        // can check the properties within our resolver's shared context value.
        getTrees: async (_, __, { dataSources }) => {
            return await dataSources.TreesAPI.getAll();
        },
    },
};
export default queries;
