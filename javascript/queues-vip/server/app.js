const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* "start": "NODE_ENV=dev DEBUG=request:* nodemon app.js"*/

// Middleware
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length)
    req.rawBody = buf.toString(encoding || 'utf8');
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));


mongoose
  .connect("mongodb+srv://brary:brary@cluster0-yvh5q.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");

    if (app._eventsCount < 20) {
      const server = app.listen(8080)
      require('./controller/queue/socket').init(server)
    }
    require("./routes/index.route")(app, mongoose)
  }).catch(err => {
    console.log(err);

  });



app.post("/", async (req, res, next) => {
  // , 'manager'
  const dbToNoRemove = ['local', 'admin', 'config', 'sushi', 'manager', 'gilad', 'demo', "try", 'SergeyKing'];
  try {
    const Domain = require('./models/domain.model');

    const domains = await Domain.aggregate([{ '$match': {} }, { '$group': { _id: '$domain' } }])


    const databases = domains.map(d => d._id).filter(d => dbToNoRemove.indexOf(d) < 0);
    console.log(databases);

    await Domain.deleteMany({ domain: databases })


    databases.forEach(dbName => {

      mongoose
        .connect(process.env.MONGO_URI + dbName, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => {
          return mongoose.connection.db.dropDatabase();

        });
    })
    res.status(205).json({ message: "delete", databases: databases.databases });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "admin error" });

  }
});



app.get("/", async (req, res, next) => {
  res.status(200).json({ message: "get only the address" });
});

// fuser -n tcp -k 8080`


app.post("/db", async (req, res, next) => {
  // , 'manager'
  const dbToNoRemove = ['local', 'admin', 'config', 'sushi', 'manager', 'gilad', 'demo', "try", 'SergeyKing', 'A'];

  try {


    const databases = await mongoose.connections[0].db
      .admin()
      .listDatabases({ listDatabases: 1, nameOnly: true });
    databases.databases.forEach(dbName => {
      if (dbToNoRemove.indexOf(dbName.name) < 0)

        mongoose
          .connect(process.env.MONGO_URI + dbName.name, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          })
          .then(() => {
            return mongoose.connection.db.dropDatabase();

          });
    })
    res.status(205).json({ message: "delete", databases: databases.databases });
  } catch (error) {

    res.status(400).json({ message: "admin error" });

  }
});