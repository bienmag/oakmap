import { MutationResolvers } from '../__generated__/resolvers-types'

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    createTree: async (_, { Tree }, { dataSources }) => {
      return await dataSources.TreesAPI.createTree(Tree)
    },
    getTreeById: async (_, { treeId }, { dataSources }) => {
      return await dataSources.TreesAPI.getTreeById(treeId)
    },
    createBranch: async (_, { Branch }, { dataSources }) => {
      return await dataSources.BranchesAPI.createBranch(Branch)
    },
    updateBranch: async (_, { Branch }, { dataSources }) => {
      return await dataSources.BranchesAPI.updateBranch(Branch)
    },
    linkUnlink: async (_, { treeId, branchId, leafId }, { dataSources }) => {
      return await dataSources.BranchesAPI.linkUnlink(treeId, branchId, leafId)
    },
    deleteBranch: async (_, { branchId }, { dataSources }) => {
      return await dataSources.BranchesAPI.deleteBranch(branchId)
    },
    createLeaf: async (_, { Leaf }, { dataSources }) => {
      return await dataSources.LeavesAPI.createLeaf(Leaf)
    },
    updateLeaf: async (_, { Leaf }, { dataSources }) => {
      return await dataSources.LeavesAPI.updateLeaf(Leaf)
    },
    createMarkDown: async (_, { Markdown }, { dataSources }) => {
      return await dataSources.LeavesAPI.createMarkDown(Markdown)
    },
    getMarkdownByNodeId: async (_, { nodeId }, { dataSources }) => {
      return await dataSources.LeavesAPI.getMarkdownByNodeId(nodeId)
    },
  },
}

export default mutations
