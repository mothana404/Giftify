const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Models');
require('dotenv').config();
const port = process.env.PORT;

const userRoutes = require('./Routes/userRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
// const passport = require('passport');
// const session = require('express-session');
// app.use(passport.initialize());
// app.use(passport.session());

app.use(userRoutes);

db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((error) => {
    console.error('Error syncing database:', error);
});