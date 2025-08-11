const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  photo: { type: String }, // Cloudinary URL
  availability: [
    {
      day: String, // e.g. "Monday"
      slots: [String] // e.g. ["9:00 AM", "2:00 PM"]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);
