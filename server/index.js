const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db.config');

require('dotenv').config();



const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB();


const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});