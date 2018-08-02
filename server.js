// This is the entry point for our server side code
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Create an express app
const app = express()

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));

// Support JSON in the request's body (for our: POST/PUT requests)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.static('dist'));

// Serve static files (HTMLs, CSSs, JSs, Imgs, etc) from this folder
// app.use(express.static('../frontend'))



const addBookRoutes = require('./routes/book-route.js')
const addUserRoutes = require('./routes/user-route.js')
// const addReviewRoutes = require('./routes/review-route.js')


addBookRoutes(app)
addUserRoutes(app)
// addReviewRoutes(app)



const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`App listening on port ${port}!`)
});



// Add Specific routes
//const addUserRoutes = require ('./routes/UserRoute')
//addUserRoutes(app)

// const addToyRoutes = require ('./routes/ToyRoute')
// addToyRoutes(app)

// const addUserRoutes = require ('./routes/UserRoute')
// addUserRoutes(app)