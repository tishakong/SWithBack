const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const session = require('express-session');
const app = express();
const port = 3000;
require('dotenv').config();
const bodyParser = require('body-parser');

const signupRouter = require('./signup');
const addPostRouter = require('./addpost');
const deletePostRouter = require('./deletepost');
const getPostsRouter = require('./getposts');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const editPostRouter = require('./editpost');
const addReviewRouter = require('./addreview.js');
const deleteReviewRouter = require('./deletereview.js');
const getReviewRouter = require('./getreview');
const checkEmailRouter = require('./checkemail');
const emailRouter = require('./email');
const setNotiRouter = require('./setnoti');
const getUserRouter = require('./userid');
const getnotiRouter = require('./getnoti');
const readnotiRouter = require('./readnoti');
const deletenotiRouter = require('./deletenoti')
const view_countRouter = require('./view_count');
const majorDetailRouter = require('./majorDetail');

const majorRouter = require('./major.js');
const newchatroomRouter = require('./newchatroom.js');
const viewchatroomRouter = require('./viewchatroom.js');
const addAdvanceQRouter = require('./addadvance_q');
const addposttagRouter = require('./addposttag');
const getscrapRouter = require('./getscrap');
const getAdvanceQRouter = require('./getadvance_q');
const addapplicationRouter = require('./addapplication');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/signup', signupRouter);
app.use('/addpost', addPostRouter);
app.use('/deletepost', deletePostRouter);
app.use('/getposts', getPostsRouter);
app.use('/addscrap', addScrapRouter);
app.use('/deletescrap', deleteScrapRouter);
app.use('/editpost', editPostRouter);
app.use('/addReview', addReviewRouter);
app.use('/deleteReview', deleteReviewRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/getreview', getReviewRouter);
app.use('/checkemail', checkEmailRouter);
app.use('/email', emailRouter);
app.use('/setnoti', setNotiRouter);
app.use('/user', getUserRouter);
app.use('/getnoti', getnotiRouter);
app.use('/readnoti', readnotiRouter);
app.use('/deletenoti', deletenotiRouter);
app.use('/view_count', view_countRouter);
app.use('/major', majorRouter);
app.use('/newchatroom', newchatroomRouter);
app.use('/viewchatroom', viewchatroomRouter);
app.use('/majordetail', majorDetailRouter);
app.use('/addadvance_q', addAdvanceQRouter);
app.use('/addposttag', addposttagRouter);
app.use('/getscrap', getscrapRouter);
app.use('/getadvance_q', getAdvanceQRouter);
app.use('/addapplication', addapplicationRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
