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
  Upload: any;
  DateTime: Date;
  JWT: string;
  _FieldSet: any;
};

export enum Order {
  /** createdAt ascending */
  ASC = "ASC",
  /** createdAt descending */
  DESC = "DESC",
}

export type Node = {
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Query = {
  __typename?: "Query";
  /** all public users */
  users: Array<User>;
  /** currently logged in user (you) */
  me: User;
  /** all public activities */
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
  /** create an new activity */
  createActivity: Activity;
  /** delete an activity */
  deleteActivity: Scalars["String"];
  /** update an activity */
  updateActivity: Activity;
  /** participate in an activity */
  joinActivity: Activity;
  /** do not participate in an activity */
  leaveActivity: Activity;
  uploadImage: Scalars["String"];
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

export type MutationdeleteActivityArgs = {
  id: Scalars["ID"];
};

export type MutationupdateActivityArgs = {
  id: Scalars["ID"];
  activityInput: ActivityInput;
};

export type MutationjoinActivityArgs = {
  id: Scalars["ID"];
};

export type MutationleaveActivityArgs = {
  id: Scalars["ID"];
};

export type MutationuploadImageArgs = {
  image: Scalars["Upload"];
};

export type User = Node & {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  lastVisitedAt?: Maybe<Scalars["DateTime"]>;
  createdActivities: Array<Activity>;
  participatesIn: Array<Participation>;
  public: Scalars["Boolean"];
};

export type Activity = Node & {
  __typename?: "Activity";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  createdBy: User;
  venueName?: Maybe<Scalars["String"]>;
  geoLocation?: Maybe<Scalars["String"]>;
  startsAt?: Maybe<Scalars["DateTime"]>;
  endsAt?: Maybe<Scalars["DateTime"]>;
  barrierFree?: Maybe<Scalars["Boolean"]>;
  public?: Maybe<Scalars["Boolean"]>;
  participations: Array<Participation>;
  freeWifiAvailable?: Maybe<Scalars["Boolean"]>;
  toilettsAvailable?: Maybe<Scalars["Boolean"]>;
  hygienePolicy?: Maybe<Scalars["String"]>;
  kidsWelcome?: Maybe<Scalars["Boolean"]>;
  petsWelcome?: Maybe<Scalars["Boolean"]>;
  smokingAllowed?: Maybe<Scalars["Boolean"]>;
};

/** Participation is when a User takes part in an Activity */
export type Participation = Node & {
  __typename?: "Participation";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
  activity: Activity;
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
  venueName?: InputMaybe<Scalars["String"]>;
  geoLocation?: InputMaybe<Scalars["String"]>;
  startsAt?: InputMaybe<Scalars["DateTime"]>;
  endsAt?: InputMaybe<Scalars["DateTime"]>;
  barrierFree?: InputMaybe<Scalars["Boolean"]>;
  public?: InputMaybe<Scalars["Boolean"]>;
  freeWifiAvailable?: InputMaybe<Scalars["Boolean"]>;
  toilettsAvailable?: InputMaybe<Scalars["Boolean"]>;
  hygienePolicy?: InputMaybe<Scalars["String"]>;
  kidsWelcome?: InputMaybe<Scalars["Boolean"]>;
  petsWelcome?: InputMaybe<Scalars["Boolean"]>;
  smokingAllowed?: InputMaybe<Scalars["Boolean"]>;
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
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  JWT: ResolverTypeWrapper<Scalars["JWT"]>;
  Order: Order;
  Node:
    | ResolversTypes["User"]
    | ResolversTypes["Activity"]
    | ResolversTypes["Participation"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Query: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Activity: ResolverTypeWrapper<Activity>;
  Participation: ResolverTypeWrapper<Participation>;
  NamePasswordInput: NamePasswordInput;
  ActivityInput: ActivityInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Upload: Scalars["Upload"];
  DateTime: Scalars["DateTime"];
  JWT: Scalars["JWT"];
  Node:
    | ResolversParentTypes["User"]
    | ResolversParentTypes["Activity"]
    | ResolversParentTypes["Participation"];
  ID: Scalars["ID"];
  Query: {};
  Float: Scalars["Float"];
  Mutation: {};
  String: Scalars["String"];
  User: User;
  Boolean: Scalars["Boolean"];
  Activity: Activity;
  Participation: Participation;
  NamePasswordInput: NamePasswordInput;
  ActivityInput: ActivityInput;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

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
    "User" | "Activity" | "Participation",
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
  deleteActivity?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteActivityArgs, "id">
  >;
  updateActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateActivityArgs, "id" | "activityInput">
  >;
  joinActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationjoinActivityArgs, "id">
  >;
  leaveActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationleaveActivityArgs, "id">
  >;
  uploadImage?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationuploadImageArgs, "image">
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
  participatesIn?: Resolver<
    Array<ResolversTypes["Participation"]>,
    ParentType,
    ContextType
  >;
  public?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
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
  venueName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
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
  barrierFree?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  public?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  participations?: Resolver<
    Array<ResolversTypes["Participation"]>,
    ParentType,
    ContextType
  >;
  freeWifiAvailable?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  toilettsAvailable?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  hygienePolicy?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  kidsWelcome?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  petsWelcome?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  smokingAllowed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParticipationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Participation"] = ResolversParentTypes["Participation"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  activity?: Resolver<ResolversTypes["Activity"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Upload?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  Participation?: ParticipationResolvers<ContextType>;
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
    participatesIn?: LoaderResolver<Array<Participation>, User, {}, TContext>;
    public?: LoaderResolver<Scalars["Boolean"], User, {}, TContext>;
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
    venueName?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Activity,
      {},
      TContext
    >;
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
    barrierFree?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    public?: LoaderResolver<Maybe<Scalars["Boolean"]>, Activity, {}, TContext>;
    participations?: LoaderResolver<
      Array<Participation>,
      Activity,
      {},
      TContext
    >;
    freeWifiAvailable?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    toilettsAvailable?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    hygienePolicy?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Activity,
      {},
      TContext
    >;
    kidsWelcome?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    petsWelcome?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
    smokingAllowed?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      Activity,
      {},
      TContext
    >;
  };

  Participation?: {
    id?: LoaderResolver<Scalars["ID"], Participation, {}, TContext>;
    createdAt?: LoaderResolver<
      Scalars["DateTime"],
      Participation,
      {},
      TContext
    >;
    updatedAt?: LoaderResolver<
      Scalars["DateTime"],
      Participation,
      {},
      TContext
    >;
    user?: LoaderResolver<User, Participation, {}, TContext>;
    activity?: LoaderResolver<Activity, Participation, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
