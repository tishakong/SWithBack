const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const session = require('express-session');
const app = express();
const port = 3000;

const signupRouter = require('./signup');
const addPostRouter = require('./addpost');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const editPostRouter = require('./editpost');
const addReviewRouter = require('./addreview.js');
const deleteReviewRouter = require('./deletereview.js');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/addpost', addPostRouter);
app.use('/addscrap', addScrapRouter);
app.use('/deletescrap', deleteScrapRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/editpost', editPostRouter);
app.use('/addReview', addReviewRouter);
app.use('/deleteReview', deleteReviewRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });