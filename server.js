const dotenv = require("dotenv");
dotenv.config();

const { connectDatabase } = require("./config/database");

connectDatabase()
  .then(() => {
    console.log("Done");
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
