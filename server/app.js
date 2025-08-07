const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const connectedDB = require('./DB/connection');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));




const server = async () => {
    try {
        await connectedDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`The server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(`Error connecting to the database: ${error.message}`);
    }
};

server();