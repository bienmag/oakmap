import mongoose from "mongoose";

const TreeSchema = new mongoose.Schema({
  _id: Object,
  treeName: String,
  date: Object,
  user: String,
  description: String,
  branches: Array,
  unlinkedLeaves: Array,
  edges: Array
}, { versionKey: false })



export const DBTree = mongoose.model(
  "DBTree",
  // @ts-ignore
  TreeSchema,
  "trees"
)

const UserSchema = new mongoose.Schema({
  _id: Object,
  user: String,
  email: String,
  password: String,
  tokens: Array,
  treeName: Array

}, { versionKey: false })



export const DBUser = mongoose.model(
  "User",
  UserSchema,
  "users"
)



const MarkdownSchema = new mongoose.Schema({
  treeId: String,
  branchId: String,
  markdownText: String,
  leafId: String,

}, { versionKey: false })

export const DBMarkdown = mongoose.model(
  "Markdown",
  MarkdownSchema,
  "markdowns"
)









