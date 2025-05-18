const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db.config');
const usersRouter = require('./routes/auth.route')
const productRouter = require('./routes/product.route')
const categoryRouter = require('./routes/category.route')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'))

connectDB();

const PORT = process.env.PORT || 3001;

app.use('/api/v1', usersRouter)
app.use('/api/v2', productRouter)
app.use('/api/v3', categoryRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});