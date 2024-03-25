const express = require('express');
const session = require('express-session');

var loginRouter = require('./login');
var logoutRouter = require('./logout');

const app = express();
const port = 3000;


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login', (req, res) => res.send('login page'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
