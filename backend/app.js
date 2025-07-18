require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
// const { verifyToken } = require('./utils/userJwt');
const session = require('express-session');
const methodOverride = require('method-override');
// const { verifyAdminToken } = require('./utils/adminJwt');
const API = require('./routes/main.route');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use((req, res, next) => {
  res.locals.flash = req.session.flash || [];
  delete req.session.flash; 
  next();
});

app.use('/api', API);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runned on http://localhost:${PORT}`);
});
