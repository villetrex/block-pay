import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export type AdminModel = {
    __typename?: 'AdminModel';
    item: Scalars['String'];
};
export type AuthRule = {
    role: UserRole;
};
export type BrandAdminModel = {
    __typename?: 'BrandAdminModel';
    item: Scalars['String'];
};
export type BrandCustomerSupport = {
    __typename?: 'BrandCustomerSupport';
    item: Scalars['String'];
};
export type Public = {
    __typename?: 'Public';
    item: Scalars['String'];
};
export type Query = {
    __typename?: 'Query';
    getUser: User;
};
export type QueryGetUserArgs = {
    userId: Scalars['ID'];
};
export type User = {
    __typename?: 'User';
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    lastName?: Maybe<Scalars['String']>;
    role?: Maybe<UserRole>;
};
export declare enum UserPermissions {
    Read = "READ",
    Write = "WRITE"
}
export declare enum UserRole {
    Admin = "ADMIN",
    BrandAdmin = "BRAND_ADMIN",
    BrandCustomerSupport = "BRAND_CUSTOMER_SUPPORT",
    Public = "PUBLIC",
    ShopifySession = "SHOPIFY_SESSION",
    User = "USER"
}
export type AdditionalEntityFields = {
    path?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<Scalars['String']>;
};
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    AdminModel: ResolverTypeWrapper<AdminModel>;
    String: ResolverTypeWrapper<Scalars['String']>;
    AuthRule: AuthRule;
    BrandAdminModel: ResolverTypeWrapper<BrandAdminModel>;
    BrandCustomerSupport: ResolverTypeWrapper<BrandCustomerSupport>;
    Public: ResolverTypeWrapper<Public>;
    Query: ResolverTypeWrapper<{}>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    User: ResolverTypeWrapper<User>;
    UserPermissions: UserPermissions;
    UserRole: UserRole;
    AdditionalEntityFields: AdditionalEntityFields;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    AdminModel: AdminModel;
    String: Scalars['String'];
    AuthRule: AuthRule;
    BrandAdminModel: BrandAdminModel;
    BrandCustomerSupport: BrandCustomerSupport;
    Public: Public;
    Query: {};
    ID: Scalars['ID'];
    User: User;
    AdditionalEntityFields: AdditionalEntityFields;
    Boolean: Scalars['Boolean'];
};
export type AuthDirectiveArgs = {
    rules: Array<AuthRule>;
};
export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type CanPerformDirectiveArgs = {
    isBrandOwner?: Scalars['Boolean'];
    roles?: Array<UserRole>;
};
export type CanPerformDirectiveResolver<Result, Parent, ContextType = any, Args = CanPerformDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type UnionDirectiveArgs = {
    discriminatorField?: Maybe<Scalars['String']>;
    additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};
export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type AbstractEntityDirectiveArgs = {
    discriminatorField: Scalars['String'];
    additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};
export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type EntityDirectiveArgs = {
    embedded?: Maybe<Scalars['Boolean']>;
    additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};
export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type ColumnDirectiveArgs = {
    overrideType?: Maybe<Scalars['String']>;
};
export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type IdDirectiveArgs = {};
export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type LinkDirectiveArgs = {
    overrideType?: Maybe<Scalars['String']>;
};
export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type EmbeddedDirectiveArgs = {};
export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type MapDirectiveArgs = {
    path: Scalars['String'];
};
export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type AdminModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminModel'] = ResolversParentTypes['AdminModel']> = {
    item?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type BrandAdminModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrandAdminModel'] = ResolversParentTypes['BrandAdminModel']> = {
    item?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type BrandCustomerSupportResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrandCustomerSupport'] = ResolversParentTypes['BrandCustomerSupport']> = {
    item?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type PublicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Public'] = ResolversParentTypes['Public']> = {
    item?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
};
export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type Resolvers<ContextType = any> = {
    AdminModel?: AdminModelResolvers<ContextType>;
    BrandAdminModel?: BrandAdminModelResolvers<ContextType>;
    BrandCustomerSupport?: BrandCustomerSupportResolvers<ContextType>;
    Public?: PublicResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
};
export type DirectiveResolvers<ContextType = any> = {
    auth?: AuthDirectiveResolver<any, any, ContextType>;
    canPerform?: CanPerformDirectiveResolver<any, any, ContextType>;
    union?: UnionDirectiveResolver<any, any, ContextType>;
    abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
    entity?: EntityDirectiveResolver<any, any, ContextType>;
    column?: ColumnDirectiveResolver<any, any, ContextType>;
    id?: IdDirectiveResolver<any, any, ContextType>;
    link?: LinkDirectiveResolver<any, any, ContextType>;
    embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
    map?: MapDirectiveResolver<any, any, ContextType>;
};
//# sourceMappingURL=graphql.d.ts.map