import mongoose from "mongoose";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri, {
        user: config.get<string>("user"),
        pass: config.get<string>("pwd")
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
}

export default connect;
