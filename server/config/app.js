let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let cors = require('cors')
let config = require('./config')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(cors());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
}))

mongoose.connect(config.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open',()=>{
    console.log('Connected to MongoDB...');
});

//routes

const usersRoute = require('../routes/users.routes')
const coursesRoute = require('../routes/courses.routes')

app.use('/api/users', usersRoute)
app.use('/api/courses', coursesRoute)

module.exports = app;