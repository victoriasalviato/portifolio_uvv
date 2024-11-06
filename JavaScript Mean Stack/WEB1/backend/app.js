const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const { log } = require("console");
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return res.status(404).json({ message: "Route " + req.url + " Not found." });
});

// Database connection
const mongoURI = 'mongodb://localhost:27017/mean-stack';
mongoose.connect('mongodb://localhost:27017/mean-stack')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch((err) => {
        console.log('Connection failed!', err);
    });

module.exports = app;

