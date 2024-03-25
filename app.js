const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const app = express();
const PORT = 3000;

const addPostRouter = require('./addpost');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');

app.use(cors());
app.use(express.json());
app.use('/addpost', addPostRouter);
app.use('/addscrap', addScrapRouter);
app.use('/deletescrap', deleteScrapRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});