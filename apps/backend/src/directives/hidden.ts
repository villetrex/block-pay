import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export const hiddenDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      // Check whether this field has the specified directive
      const hiddenDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (hiddenDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (result) {
            return null;
          }
        };

        return fieldConfig;
      }
    },
  });
};
