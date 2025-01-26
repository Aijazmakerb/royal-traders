import mongoose from "mongoose";

export const ConnectToDatabase = () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  console.warn(process.env.MONGO_URI);
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
