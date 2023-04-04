"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperDirectiveTransformer = void 0;
const utils_1 = require("@graphql-tools/utils");
const graphql_1 = require("graphql");
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
const upperDirectiveTransformer = (schema, directiveName) => {
    return (0, utils_1.mapSchema)(schema, {
        // Executes once for each object field in the schema
        [utils_1.MapperKind.OBJECT_FIELD]: fieldConfig => {
            var _a;
            // Check whether this field has the specified directive
            const upperDirective = (_a = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)) === null || _a === void 0 ? void 0 : _a[0];
            if (upperDirective) {
                // Get this field's original resolver
                const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                // Replace the original resolver with a function that *first* calls
                // the original resolver, then converts its result to upper case
                fieldConfig.resolve = function (source, args, context, info) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const result = yield resolve(source, args, context, info);
                        if (typeof result === "string") {
                            return result.toUpperCase();
                        }
                        return result;
                    });
                };
                return fieldConfig;
            }
        },
    });
};
exports.upperDirectiveTransformer = upperDirectiveTransformer;
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
