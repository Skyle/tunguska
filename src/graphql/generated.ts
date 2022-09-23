import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
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
  DateTime: Date;
  JWT: string;
  _FieldSet: any;
};

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export type Node = {
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Query = {
  __typename?: "Query";
  /** returns all users */
  users: Array<User>;
  /** returns the currently logged in user */
  me: User;
  /** return all public activities */
  activities: Array<Activity>;
};

export type QueryactivitiesArgs = {
  limit?: InputMaybe<Scalars["Float"]>;
  skip?: InputMaybe<Scalars["Float"]>;
  order?: InputMaybe<Order>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** create a new User  and get a JWT to authenticate with */
  signUp: Scalars["JWT"];
  /** sign in with credentials and get a JWT to authenticate with */
  signIn: Scalars["JWT"];
  /** create a new activity */
  createActivity: Activity;
};

export type MutationsignUpArgs = {
  credentials: NamePasswordInput;
};

export type MutationsignInArgs = {
  credentials: NamePasswordInput;
};

export type MutationcreateActivityArgs = {
  activityInput: ActivityInput;
};

export type User = Node & {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  lastVisitedAt?: Maybe<Scalars["DateTime"]>;
  createdActivities: Array<Activity>;
};

export type Activity = Node & {
  __typename?: "Activity";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  createdBy: User;
  createdById: Scalars["String"];
  venue?: Maybe<Scalars["String"]>;
  geoLocation?: Maybe<Scalars["String"]>;
  startsAt?: Maybe<Scalars["DateTime"]>;
  endsAt?: Maybe<Scalars["DateTime"]>;
  barrierfree?: Maybe<Scalars["Boolean"]>;
  public?: Maybe<Scalars["Boolean"]>;
  joinedBy: Array<ActivityAttendance>;
};

export type ActivityAttendance = Node & {
  __typename?: "ActivityAttendance";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["String"];
  activity: Activity;
  activityId: Scalars["String"];
};

export type NamePasswordInput = {
  /**
   * not empty
   * length >= 2
   */
  name: Scalars["String"];
  /** length >= 6 */
  password: Scalars["String"];
};

export type ActivityInput = {
  title?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  venue?: InputMaybe<Scalars["String"]>;
  geoLocation?: InputMaybe<Scalars["String"]>;
  startsAt?: InputMaybe<Scalars["DateTime"]>;
  endsAt?: InputMaybe<Scalars["DateTime"]>;
  barrierfree?: InputMaybe<Scalars["Boolean"]>;
  public?: InputMaybe<Scalars["Boolean"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  JWT: ResolverTypeWrapper<Scalars["JWT"]>;
  Order: Order;
  Node:
    | ResolversTypes["User"]
    | ResolversTypes["Activity"]
    | ResolversTypes["ActivityAttendance"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Query: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Mutation: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Activity: ResolverTypeWrapper<Activity>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ActivityAttendance: ResolverTypeWrapper<ActivityAttendance>;
  NamePasswordInput: NamePasswordInput;
  ActivityInput: ActivityInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars["DateTime"];
  JWT: Scalars["JWT"];
  Node:
    | ResolversParentTypes["User"]
    | ResolversParentTypes["Activity"]
    | ResolversParentTypes["ActivityAttendance"];
  ID: Scalars["ID"];
  Query: {};
  Float: Scalars["Float"];
  Mutation: {};
  User: User;
  String: Scalars["String"];
  Activity: Activity;
  Boolean: Scalars["Boolean"];
  ActivityAttendance: ActivityAttendance;
  NamePasswordInput: NamePasswordInput;
  ActivityInput: ActivityInput;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface JWTScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JWT"], any> {
  name: "JWT";
}

export type NodeResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  resolveType: TypeResolveFn<
    "User" | "Activity" | "ActivityAttendance",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  activities?: Resolver<
    Array<ResolversTypes["Activity"]>,
    ParentType,
    ContextType,
    Partial<QueryactivitiesArgs>
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  signUp?: Resolver<
    ResolversTypes["JWT"],
    ParentType,
    ContextType,
    RequireFields<MutationsignUpArgs, "credentials">
  >;
  signIn?: Resolver<
    ResolversTypes["JWT"],
    ParentType,
    ContextType,
    RequireFields<MutationsignInArgs, "credentials">
  >;
  createActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateActivityArgs, "activityInput">
  >;
};

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastVisitedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  createdActivities?: Resolver<
    Array<ResolversTypes["Activity"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Activity"] = ResolversParentTypes["Activity"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  venue?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  geoLocation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  startsAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  endsAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  barrierfree?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  public?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  joinedBy?: Resolver<
    Array<ResolversTypes["ActivityAttendance"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityAttendanceResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["ActivityAttendance"] = ResolversParentTypes["ActivityAttendance"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  activity?: Resolver<ResolversTypes["Activity"], ParentType, ContextType>;
  activityId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  DateTime?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  ActivityAttendance?: ActivityAttendanceResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  User?: {
    id?: LoaderResolver<Scalars["ID"], User, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], User, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], User, {}, TContext>;
    lastVisitedAt?: LoaderResolver<
      Maybe<Scalars["DateTime"]>,
      User,
      {},
      TContext
    >;
    createdActivities?: LoaderResolver<Array<Activity>, User, {}, TContext>;
  };

  Activity?: {
    id?: LoaderResolver<Scalars["ID"], Activity, {}, TContext>;
    title?: LoaderResolver<Maybe<Scalars["String"]>, Activity, {}, TContext>;
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Activity,
      {},
      TContext
    >;
    createdAt?: LoaderResolver<Scalars["DateTime"], Activity, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], Activity, {}, TContext>;
    createdBy?: LoaderResolver<User, Activity, {}, TContext>;
    createdById?: LoaderResolver<Scalars["String"], Activity, {}, TContext>;
    venue?: LoaderResolver<Maybe<Scalars["String"]>, Activity, {}, TContext>;
    geoLocation?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Activity,
      {},
      TContext
    >;
    startsAt?: LoaderResolver<
      Maybe<Scalars["DateTime"]>,
      Activity,
      {},
      TContext
    >;
    endsAt?: LoaderResolver<Maybe<Scalars["DateTime"]>, Activity, {}, TContext>;
    barrierfree?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    public?: LoaderResolver<Maybe<Scalars["Boolean"]>, Activity, {}, TContext>;
    joinedBy?: LoaderResolver<
      Array<ActivityAttendance>,
      Activity,
      {},
      TContext
    >;
  };

  ActivityAttendance?: {
    id?: LoaderResolver<Scalars["ID"], ActivityAttendance, {}, TContext>;
    createdAt?: LoaderResolver<
      Scalars["DateTime"],
      ActivityAttendance,
      {},
      TContext
    >;
    updatedAt?: LoaderResolver<
      Scalars["DateTime"],
      ActivityAttendance,
      {},
      TContext
    >;
    user?: LoaderResolver<User, ActivityAttendance, {}, TContext>;
    userId?: LoaderResolver<
      Scalars["String"],
      ActivityAttendance,
      {},
      TContext
    >;
    activity?: LoaderResolver<Activity, ActivityAttendance, {}, TContext>;
    activityId?: LoaderResolver<
      Scalars["String"],
      ActivityAttendance,
      {},
      TContext
    >;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
