const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectedDB = require("./DB/connection");
const authRoutes = require("./routes/authRoute");
const providerRoutes = require("./routes/providerRoute"); 

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS with cookies
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Parse cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/provider", providerRoutes);

// Start server
const server = async () => {
  try {
    await connectedDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(` DB Connection Error: ${error.message}`);
  }
};

server();
