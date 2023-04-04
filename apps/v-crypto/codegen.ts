import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/graphql/operations/users.ts',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withMutationFn: true,
        withRefetchFn: true,
      },
    },
  },
};

export default config;
