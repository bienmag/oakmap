const config = {
    overwrite: true,
    schema: 'http://localhost:4000',
    documents: 'src/**/*.tsx',
    generates: {
        'src/gql': {
            preset: 'client',
            plugins: [],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};
export default config;
