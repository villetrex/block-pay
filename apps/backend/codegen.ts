import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  // documents: "src/schema/index.ts",
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-resolvers',
        'typescript-mongodb',
        'typescript-document-nodes',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
