import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
/**
 * @notice cast to upper case directive
 * @dev upper directive
 * @author Louis
 * @param schema
 * @param directiveName
 * @returns
 */
export const upperDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
};

// Create the base executable schema
// let schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// // Transform the schema by applying directive logic
// schema = upperDirectiveTransformer(schema, "upper");

// const server = new ApolloServer({ schema });

// const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

// console.log(`🚀 Server listening at: ${url}`);
