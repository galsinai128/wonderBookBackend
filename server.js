const cors = require('cors');


// This is the entry point for our server side code

const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser')
const session = require('express-session')

// Create an express app
const app = express()


app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`App listening on port ${port}!`)
});

// Serve static files (HTMLs, CSSs, JSs, Imgs, etc) from this folder
app.use(express.static('../frontend'))

// Support JSON in the request's body (for our: POST/PUT requests)
app.use(bodyParser.json());


app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Add Specific routes
//const addUserRoutes = require ('./routes/UserRoute')
//addUserRoutes(app)

// const addToyRoutes = require ('./routes/ToyRoute')
// addToyRoutes(app)

// const addUserRoutes = require ('./routes/UserRoute')
// addUserRoutes(app)