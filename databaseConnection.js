const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });

  db.on("error", console.error.bind(console, "Connection Error :-("));
  db.once("open", function () {
    console.log("DB Connected Succesfully :-) ");
  });
}

module.exports = DbConnection;
