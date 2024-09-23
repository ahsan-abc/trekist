const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
//<-------middleware----------->
app.use(bodyparser.json());
app.use(cors());
//<-------connect to mongodb----------->

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
  //await mongoose.connect(process.env.DB_KEY);
  await mongoose.connect(
    "mongodb+srv://portfolio:zgR6qCTeiN0q9BC1@cluster0.myskyxj.mongodb.net/trekist?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(process.env.DB_KEY);
  console.log("connected to mongodb");
}

// schema for the 'shoes' collection
const shoesSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: [Number],
  description: String,
  type: String,
  image: String,
  profile_image: [String],
});
// schema for the 'collection' collection
const collectionSchema = new mongoose.Schema({
  name: String,
  shoes: [Object], // Array of image URLs
});

// model for the 'shoes' collection
const Shoes = mongoose.model("shoes", shoesSchema);
// model for the 'collection' collection
const Collection = mongoose.model("Collection", collectionSchema, "collection");

//<-------send  ----------->

app.get("/", (req, res) => {
  console.log("/ request");
  res.send("hello");
});

//<-------send shoes----------->
app.get("/shoes", async (req, res) => {
  async function hello() {
    const data = await Shoes.find();
    console.log("get /shoes");
    res.json(data); // Send shoes data as JSON
  }
  hello();
});

//<-------send collections----------->
app.get("/collections", async (req, res) => {
  async function hello() {
    const data = await Collection.find();
    console.log("get /collections");
    res.json(data); // Send shoes data as JSON
  }
  hello();
});

//<-------listen at the port 8000----------->

app.listen(8000, () => {
  console.log("server is running");
});
