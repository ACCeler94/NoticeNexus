const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// import routes
const addsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');

app.use(express.json()); // required to handle form-data request
app.use(cors()); // middleware to enable CORS requests
app.use('/api', addsRoutes); // add adds routes
//app.use('/auth', usersRoutes); // add users routes


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


// Display when url is invalid
app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if (NODE_ENV === 'production') dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rczlaff.mongodb.net/NoticeNexus?retryWrites=true&w=majority'`;

else if (NODE_ENV === 'test') dbURI = 'mongodb://0.0.0.0:27017/NoticeNexus';
else dbURI = 'mongodb://0.0.0.0:27017/NoticeNexus';


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