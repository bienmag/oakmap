// import express, { Express, Request, Response } from "express";
import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


dotenv.config()

const app = express()
const port = 8080

//change to dotenv later
mongoose.connect("mongodb+srv://bienmag:12345@cluster0.flb34gb.mongodb.net/?retryWrites=true&w=majority").then(() =>
  console.log("✅ Database connection successful")).catch(() => console.log("database connection error")
  )



const TreeSchema = {

  name: String,
  author: String,

}


const Tree = mongoose.model(
  "Tree",
  // @ts-ignore
  TreeSchema,
  "trees"
)



// @ts-ignore
Tree.findOne({ author: "Rita" }, (err, foundItem) => {
  if (err) {
    console.log(err)
  } else {
    console.log('i have found item', foundItem)
  }
})


app.listen(port, () => {
  console.log(`🦸🏽 [server]: Server is running at ${port}`)
})
