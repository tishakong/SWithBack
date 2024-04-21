const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const session = require('express-session');
const app = express();
const port = 3000;
require('dotenv').config();

const signupRouter = require('./signup');
const addPostRouter = require('./addpost');
const deletePostRouter = require('./deletepost')
const getPostsRouter = require('./getposts');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const editPostRouter = require('./editpost');
const addReviewRouter = require('./addreview.js');
const deleteReviewRouter = require('./deletereview.js');
const getreviewRouter = require('./getreview');
const checkemailRouter = require('./checkemail');
const emailRouter = require('./email');

app.use(session({
    secret: 'your-secret-key', //SID를 생성할 때 사용되는 비밀키    
    resave: false, // 변경사항이 없어도 세션을 다시 저장하는지 여부
    saveUninitialized: true, // 어떠한 데이터도 추가되거나 변경되지 않은 세션 설정 허용
}));
app.use(cors());
app.use(express.json());
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
app.use('/getreview', getreviewRouter);
app.use('/checkemail', checkemailRouter);
app.use('/email', emailRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});