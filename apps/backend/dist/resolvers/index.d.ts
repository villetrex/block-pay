export declare const resolvers: {
    Query: {
        getUser: import("../generated/graphql").Resolver<import("../generated/graphql").ResolverTypeWrapper<import("../generated/graphql").User>, {}, any, import("../generated/graphql").RequireFields<import("../generated/graphql").QueryGetUserArgs, "userId">> | undefined;
    };
    Subscription: {
        userCreated: {
            subscribe: import("graphql-subscriptions").ResolverFn;
        };
    };
};
//# sourceMappingURL=index.d.ts.map