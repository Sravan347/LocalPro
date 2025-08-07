const mongoose = require("mongoose");

const connectionDb = async (uri) => {
  try {
    await mongoose.connect(uri, {});
    console.log("✅ Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectionDb;
