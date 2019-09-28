const mongoose = require("mongoose");
const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASSWORD
} = require("./environment");

const connectDatabase = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    {
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 1000, // Reconnect every second
      poolSize: 10, // Maximum number of sockets the MongoDB driver will keep open for the connection.
      bufferMaxEntries: 0, // Let database operations to fall immediately when driver is not connected.
      bufferCommands: false, // Let database operations to fall immediately when driver is not connected.
      connectTimeoutMS: 10000, // The MongoDB driver will wait for 10 seconds before falling.
      socketTimeoutMS: 40000, // The MongoDB driver will wait for 40 seconds before killing an inactive socket.
      useNewUrlParser: true, // Use the new parser
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
};

module.exports = {
  connectDatabase
};
