require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const port = process.env.PORT || 3001;
const createError = require('http-errors');
const path = require("path");


app.set('port', port);
app.options('/', cors());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
var corsOptions = {
    origin: function (origin, callback) {
        console.log("ORIGIN:");
        console.log(origin);
        console.log(whitelist.indexOf(origin));
        origin: true
        callback(null, true)
    },
  credentials: true
}

// mongoose models
mongoose.connect(`mongodb+srv://${process.env.ADMIN}:${process.env.MONGO_PW}@citizen-hornitos-fhgna.mongodb.net/citizen-hornitos`, {useNewUrlParser: true})
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open', function (){
console.log("MongoDB connection establised to development server")
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));   

//api routes for different routes
app.use('/questions', require("./api/questions.js"));
app.use('/users', require("./api/users.js"));

// // root of the server is opened up for cors
// app.get('/', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
// })

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', cors(corsOptions), (req, res) => {
    res.sendFile(path.join(__dirname+'../build/index.html'));
  });

app.use(cors(corsOptions));

//models
require("./models/questions");
require("./models/users");


// catch 404 erros
app.use((req,res,next) => {
    next(createError(404))          // add route to 404 not found functionality later
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
