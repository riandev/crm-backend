const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5000;

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://hotonion:01939773554op5t@cluster0.rdppk.mongodb.net/fifocrm?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const userCollection = client.db("fifocrm").collection("users");
  const leadsCollection = client.db("fifocrm").collection("leads");
  console.log("user Connection");
  app.get("/agent", (req, res) => {
    const email = req.query.email;
    console.log(email);
    userCollection.find({ email: email }).toArray((err, agents) => {
      console.log(agents[0]);
      res.send(agents[0]);
    });
  });
  app.get("/matchedNumber", (req, res) => {
    const Consumer_No = req.query.Consumer_No;
    leadsCollection
      .find({ Consumer_No: Consumer_No })
      .toArray((err, consumer) => {
        console.log(consumer);
        res.send(consumer);
      });
  });
  app.get("/dMatched", (req, res) => {
    const for_d = "d";
    leadsCollection.find({ for_d: for_d }).toArray((err, d) => {
      res.send(d);
    });
  });
  app.patch("/answers/:id", (req, res) => {
    const answers = req.body;
    console.log(answers);
    const id = ObjectID(req.params.id);
    leadsCollection
      .updateOne(
        { _id: id },
        {
          $set: {
            answer1: answers.ans1,
            answer2: answers.ans2,
            answer3: answers.ans3,
            answer4: answers.ans4,
            answer4dot1: answers.ans4dot1,
            answer5: answers.ans5,
            answer5dot1: answers.ans5dot1,
            answer5dot2: answers.ans5dot2,
            answer5dot3: answers.ans5dot3,
            answer6: answers.ans6,
            answer7: answers.ans7,
            answer8: answers.ans8,
            agentID:answers.agentID
          },
        }
      )
      .then((result) => {
        console.log(result);
      });
  });
  app.get("/reports", (req, res) => {
    leadsCollection.find({}).toArray((err, reports) => {
      res.send(reports);
    });
  });
  app.get("/qc/:number", (req, res) => {
    const number = req.params.number;
    leadsCollection.find({ Consumer_No: number }).toArray((err, qcs) => {
      console.log(qcs);
      res.send(qcs);
    });
  });
  app.get("/update/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    leadsCollection
      .find({ _id: ObjectID(req.params.id) })
      .toArray((err, update) => {
        console.log(update);
        res.send(update);
      });
  });
  app.patch("/updateQ7/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    const q7 = req.body;
    console.log(id, q7);
    leadsCollection
      .updateOne(
        { _id: id },
        {
          $set: {
            answer7: q7,
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.send(result.modifiedCount > 0);
      });
  });
  app.patch("/updateQ8/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    const q8 = req.body;
    console.log(id, q8);
    leadsCollection
      .updateOne(
        { _id: id },
        {
          $set: {
            answer8: q8,
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.send(result.modifiedCount > 0);
      });
  });
  app.patch("/finalUpdate/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    const update = req.body;
    console.log(id);
    leadsCollection
      .updateOne(
        { _id: id },
        {
          $set: {
            answer1: update.answer1,
            answer2: update.answer2,
            answer3: update.answer3,
            answer4: update.answer4,
            answer4dot1: update.answer4dot1,
            answer5: update.answer5,
            answer5dot1: update.answer5dot1,
            answer5dot2: update.answer5dot2,
            answer5dot3: update.answer5dot3,
            answer6: update.answer6
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.send(result.modifiedCount > 0);
      });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port);
