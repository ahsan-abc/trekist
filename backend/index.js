const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const { setTimeout } = require("timers/promises");
dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();
//<-------middleware----------->
app.use(bodyparser.json());
app.use(cors());
//<-------connect to mongodb----------->

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/');
  await mongoose.connect(process.env.DB_KEY);
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
// schema for the 'order' collection
const orderSchema = new mongoose.Schema({
  product: Object,
  address: Object,
  status: String,
  date: String,
});

// model for the 'shoes' collection
const Shoes = mongoose.model("shoes", shoesSchema);
// model for the 'collection' collection
const Collection = mongoose.model("Collection", collectionSchema, "collection");
// model for the 'order' collection
const Order = mongoose.model("Order", orderSchema);

//<-------send  ----------->

app.get("/", (req, res) => {
  console.log("get /");
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

//<------------ recive order--------------->
app.post("/order", async (request, response) => {
  console.log("post /order");
  async function hello(req, res) {
    console.log("put /order");

    const data = await req.body;
    console.log(data.order);

    /////////////////////////////////
    let result = Array(data.order).fill("null");
    console.log("dataorder", typeof data.order);

    setTimeout(
      data.order.forEach((element, index) => {
        console.log("====", index);
        const newOrder = new Order({
          product: element,
          address: data.address,
          status: "On the way",
          date: data.date,
        });
        // Save the new user to the database
        newOrder
          .save()
          .then((doc) => {
            console.log(`New user added: ${doc}`);
            result[index] = doc._id;

            function check() {
              for (let i = 0; i < data.order.length; i++) {
                if (result[i] == "null") return false;
                else return true;
              }
            }
            if (check() == true) res.json({ result: result });

            console.log("++++++++++", result);
          })
          .catch((err) => {
            console.error("Error adding user:", err);
            res.json({ result: "error" });
          })
          .finally(() => {
            // Close the connection after the operation
            console.log("order process end");
          });
      }),
      1000
    );
  }

  hello(request, response);
});

//<-------send confirm order----------->
/*app.POST("/confirmorder", async (req, res) => {
  async function hello(request, response) {
    console.log(request.body);
   
    console.log(results);
    console.log("get / order");
    res.json({ yo: 123 }); // Send shoes data as JSON
  }
  hello(req, res);
});
*/
app.post("/confirmorder", async (request, response) => {
  console.log("post /confirmorder");
  async function hello(req, res) {
    console.log("put /order");

    const data = await req.body;
    console.log("data", data);

    /////////////////////////////////
    const ids = data;
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    Order.find({ _id: { $in: objectIds } })
      .then((doc) => {
        console.log(`confirm order list: ${doc}`);

        res.json({ result: doc });
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        res.json({ result: "error" });
      })
      .finally(() => {
        // Close the connection after the operation
        console.log("confirm order list end");
      });
  }

  hello(request, response);
});

//<-------listen at the port 8000----------->

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
