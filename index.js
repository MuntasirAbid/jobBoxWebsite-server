require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 10000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tkhdgb3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
  try {
    const db = client.db("jobBox");
    const userCollection = db.collection("user");
    const jobCollection = db.collection("job");

    // app.get('/users', async (req, res) => {
    //   const cursor = userCollection.find({});
    //   const product = await cursor.toArray();

    //   res.send({ status: true, data: product });
    // });

    //registering user
    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {

        return res.send({ status: true, data: result });

      }

      res.send({ status: false });
    });

    //posting job
    app.post("/job", async (req, res) => {
      const job = req.body;

      const result = await jobCollection.insertOne(job);

      res.send({ status: true, data: result });
    });

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running....");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
