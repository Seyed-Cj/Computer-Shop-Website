require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
// const { verifyToken } = require('./utils/userJwt');
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
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = verifyToken(token);
      res.locals.user = decoded;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

app.use('/api', API);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runned on http://localhost:${PORT}`);
});
