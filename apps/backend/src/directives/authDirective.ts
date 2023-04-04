// import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
// import { defaultFieldResolver } from 'graphql';

// class AuthDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const requiredRole = this.args.requires;
//     const originalResolve = field.resolve || defaultFieldResolver;
//     field.resolve = function (...args) {
//       const context = args[2];
//       const user = context.getUser() || {};
//       const isAuthorized = user.role === requiredRole;
//       if (!isAuthorized) {
//         throw new AuthenticationError(`You need following role: ${requiredRole}`);
//       }
//       return originalResolve.apply(this, args);
//     };
//   }
// }

import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';

/**
 * @notice cast to upper case directive
 * @dev auth directive
 * @author Louis
 * @param schema
 * @param directiveName
 * @returns
 */
export const authDirective = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      // Check whether this field has the specified directive
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;
        const rules: any = authDirective.requires;
        fieldConfig.resolve = async function (source, args, context, info) {
          const userRole = await context.user.role;
          const isValidRole = rules.some((role: any) => role == userRole);
          if (isValidRole) {
            return await resolve(source, args, context, info);
          }
          throw new GraphQLError('user role not authorized', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
        };
        return fieldConfig;
      }
    },
  });
};
