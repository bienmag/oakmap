import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Branch = {
  __typename?: 'Branch';
  branchId?: Maybe<Scalars['String']>;
  branchName?: Maybe<Scalars['String']>;
  leaves?: Maybe<Array<Maybe<Leaf>>>;
  position?: Maybe<Scalars['String']>;
  treeId?: Maybe<Scalars['String']>;
};

export type BranchArg = {
  branchId?: InputMaybe<Scalars['String']>;
  branchName?: InputMaybe<Scalars['String']>;
  leaves?: InputMaybe<Array<InputMaybe<LeafArg>>>;
  position?: InputMaybe<Scalars['String']>;
  treeId?: InputMaybe<Scalars['String']>;
};

export type Leaf = {
  __typename?: 'Leaf';
  branchId?: Maybe<Scalars['String']>;
  leafId?: Maybe<Scalars['String']>;
  leafName?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  treeId?: Maybe<Scalars['String']>;
};

export type LeafArg = {
  branchId?: InputMaybe<Scalars['String']>;
  leafId?: InputMaybe<Scalars['String']>;
  leafName?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  treeId?: InputMaybe<Scalars['String']>;
};

export type Markdown = {
  __typename?: 'Markdown';
  branchId?: Maybe<Scalars['String']>;
  leafId?: Maybe<Scalars['String']>;
  markdownText?: Maybe<Scalars['String']>;
  treeId?: Maybe<Scalars['String']>;
};

export type MarkdownArg = {
  branchId?: InputMaybe<Scalars['String']>;
  leafId?: InputMaybe<Scalars['String']>;
  markdownText?: InputMaybe<Scalars['String']>;
  treeId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBranch?: Maybe<Branch>;
  createLeaf?: Maybe<Leaf>;
  createMarkDown?: Maybe<Markdown>;
  createTree?: Maybe<Tree>;
  deleteBranch?: Maybe<Branch>;
  getMarkdownByNodeId?: Maybe<Markdown>;
  getTreeById?: Maybe<Tree>;
  linkUnlink?: Maybe<Scalars['Boolean']>;
  updateBranch?: Maybe<Branch>;
  updateLeaf?: Maybe<Leaf>;
};


export type MutationCreateBranchArgs = {
  Branch?: InputMaybe<BranchArg>;
};


export type MutationCreateLeafArgs = {
  Leaf?: InputMaybe<LeafArg>;
};


export type MutationCreateMarkDownArgs = {
  Markdown?: InputMaybe<MarkdownArg>;
};


export type MutationCreateTreeArgs = {
  Tree?: InputMaybe<TreeArg>;
};


export type MutationDeleteBranchArgs = {
  branchId?: InputMaybe<Scalars['String']>;
};


export type MutationGetMarkdownByNodeIdArgs = {
  nodeId?: InputMaybe<Scalars['String']>;
};


export type MutationGetTreeByIdArgs = {
  treeId?: InputMaybe<Scalars['String']>;
};


export type MutationLinkUnlinkArgs = {
  branchId?: InputMaybe<Scalars['String']>;
  leafId?: InputMaybe<Scalars['String']>;
  treeId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateBranchArgs = {
  Branch?: InputMaybe<BranchArg>;
};


export type MutationUpdateLeafArgs = {
  Leaf?: InputMaybe<LeafArg>;
};

export type Query = {
  __typename?: 'Query';
  getTrees?: Maybe<Array<Maybe<Tree>>>;
};

export type Tree = {
  __typename?: 'Tree';
  _id?: Maybe<Scalars['String']>;
  branches?: Maybe<Array<Maybe<Branch>>>;
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  treeName?: Maybe<Scalars['String']>;
  unlinkedLeaves?: Maybe<Array<Maybe<Leaf>>>;
  user?: Maybe<Scalars['String']>;
};

export type TreeArg = {
  _id?: InputMaybe<Scalars['String']>;
  branches?: InputMaybe<Array<InputMaybe<BranchArg>>>;
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  treeName?: InputMaybe<Scalars['String']>;
  unlinkedLeaves?: InputMaybe<Array<InputMaybe<LeafArg>>>;
  user?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Branch: ResolverTypeWrapper<Branch>;
  BranchArg: BranchArg;
  Leaf: ResolverTypeWrapper<Leaf>;
  LeafArg: LeafArg;
  Markdown: ResolverTypeWrapper<Markdown>;
  MarkdownArg: MarkdownArg;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tree: ResolverTypeWrapper<Tree>;
  TreeArg: TreeArg;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Branch: Branch;
  BranchArg: BranchArg;
  Leaf: Leaf;
  LeafArg: LeafArg;
  Markdown: Markdown;
  MarkdownArg: MarkdownArg;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Tree: Tree;
  TreeArg: TreeArg;
}>;

export type BranchResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Branch'] = ResolversParentTypes['Branch']> = ResolversObject<{
  branchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branchName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leaves?: Resolver<Maybe<Array<Maybe<ResolversTypes['Leaf']>>>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LeafResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Leaf'] = ResolversParentTypes['Leaf']> = ResolversObject<{
  branchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leafId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leafName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarkdownResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Markdown'] = ResolversParentTypes['Markdown']> = ResolversObject<{
  branchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leafId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markdownText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createBranch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, Partial<MutationCreateBranchArgs>>;
  createLeaf?: Resolver<Maybe<ResolversTypes['Leaf']>, ParentType, ContextType, Partial<MutationCreateLeafArgs>>;
  createMarkDown?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType, Partial<MutationCreateMarkDownArgs>>;
  createTree?: Resolver<Maybe<ResolversTypes['Tree']>, ParentType, ContextType, Partial<MutationCreateTreeArgs>>;
  deleteBranch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, Partial<MutationDeleteBranchArgs>>;
  getMarkdownByNodeId?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType, Partial<MutationGetMarkdownByNodeIdArgs>>;
  getTreeById?: Resolver<Maybe<ResolversTypes['Tree']>, ParentType, ContextType, Partial<MutationGetTreeByIdArgs>>;
  linkUnlink?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationLinkUnlinkArgs>>;
  updateBranch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, Partial<MutationUpdateBranchArgs>>;
  updateLeaf?: Resolver<Maybe<ResolversTypes['Leaf']>, ParentType, ContextType, Partial<MutationUpdateLeafArgs>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getTrees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tree']>>>, ParentType, ContextType>;
}>;

export type TreeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Tree'] = ResolversParentTypes['Tree']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branches?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unlinkedLeaves?: Resolver<Maybe<Array<Maybe<ResolversTypes['Leaf']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Branch?: BranchResolvers<ContextType>;
  Leaf?: LeafResolvers<ContextType>;
  Markdown?: MarkdownResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tree?: TreeResolvers<ContextType>;
}>;

