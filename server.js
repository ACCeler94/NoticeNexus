const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');


// import routes
const adsRoutes = require('./routes/ads.routes');
const authUserRoutes = require('./routes/auth.users.routes');


// mongodb connection string
const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';
if (NODE_ENV === 'production') dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rczlaff.mongodb.net/NoticeNexus?retryWrites=true`;
else if (NODE_ENV === 'test') dbURI = 'mongodb://0.0.0.0:27017/NoticeNexus';
else dbURI = 'mongodb://0.0.0.0:27017/NoticeNexus';


app.use(express.json()); // required to handle form-data request
app.use(express.urlencoded({ extended: false }))

// enable cors only for non production app
if (NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: process.env.NODE_ENV === 'production',
  store: mongoStore.create({ mongoUrl: dbURI }),
  cookie: {
    secure: false,
  },
}))
app.use('/api', adsRoutes); // add ads routes
app.use('/auth', authUserRoutes); // add users routes


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public'))); // serve files from public folder

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Display when url is invalid
app.use((req, res) => {
  res.status(404).send('404 not found...');
})


// connects our backend code with the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});