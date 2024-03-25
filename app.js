const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const session = require('express-session');
const app = express();
const port = 3000;

const signupRouter = require('./register');
const addPostRouter = require('./addpost');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');
var loginRouter = require('./login');
var logoutRouter = require('./logout');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use('signup', signupRouter);
app.use('/addpost', addPostRouter);
app.use('/addscrap', addScrapRouter);
app.use('/deletescrap', deleteScrapRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login', (req, res) => res.send('login page'));

app.post('/register', (req, res) => {
    res.send('sign in')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
