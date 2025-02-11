//app.js
const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const session = require('express-session');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);
require('./socket.js')(io);

const signupRouter = require('./signup');
const addPostRouter = require('./addpost');
const deletePostRouter = require('./deletepost');
const getPostsRouter = require('./getposts');
const addScrapRouter = require('./addscrap');
const deleteScrapRouter = require('./deletescrap');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const editPostRouter = require('./editpost');
const editPostTagRouter = require('./editposttag');
const addReviewRouter = require('./addreview');
const deleteReviewRouter = require('./deletereview.js');
const getReviewRouter = require('./getreview');
const checkEmailRouter = require('./checkemail');
const emailRouter = require('./email');
const setNotiRouter = require('./setnoti');
const getUserRouter = require('./userid');
const getnotiRouter = require('./getnoti');
const readnotiRouter = require('./readnoti');
const deletenotiRouter = require('./deletenoti');
const sendNotiRouter = require('./sendnoti');
const view_countRouter = require('./view_count');
const majorDetailRouter = require('./majorDetail');
const userPostsRouter = require('./userposts');
const userApplicationsRouter = require('./userapplications');
const majorRouter = require('./major.js');
const newchatroomRouter = require('./newchatroom.js');
//const getchatroomsRouter = require('./getchatrooms.js');
const addAdvanceQRouter = require('./addadvance_q');
const addAdvanceARouter = require('./addadvance_a');
const addposttagRouter = require('./addposttag');
const getChatroomMessagesRouter = require('./getChatroomMessages.js');
const getscrapRouter = require('./getscrap');
const getAdvanceQRouter = require('./getadvance_q');
const addapplicationRouter = require('./addapplication');
const getStudyMembersRouter = require('./getStudyMembers.js');
const checkReviewRouter = require('./checkreview');
const patchpostprogressRouter = require('./patchpostprogress');
const getapplicantsRouter = require('./getapplicants.js');
const patchapplicantstatusRouter = require('./patchapplicantstatus');
const getadvanceanswerRouter = require('./getadvanceanswer');
const getquestionsRouter = require('./getquestions');
const addquestionRouter = require('./addquestion');
const addanswerRouter = require('./addanswer');
const changePasswordRouter = require('./userid');
const getChatroomMembersRouter = require('./getChatroomMembers.js');
const leaveRoomRouter = require('./leaveroom.js');
const checkhostRouter = require('./checkhost.js');
const checkApplicationRouter = require('./checkApplication');


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({ origin: '*' }));
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
app.use('/editposttag', editPostTagRouter);
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
app.use('/sendnotification', sendNotiRouter); 
app.use('/view_count', view_countRouter);
app.use('/major', majorRouter);
app.use('/newchatroom', newchatroomRouter);
//app.use('/getchatrooms', getchatroomsRouter);
app.use('/majordetail', majorDetailRouter);
app.use('/userposts', userPostsRouter);
app.use('/userapplications', userApplicationsRouter);
app.use('/addadvance_q', addAdvanceQRouter);
app.use('/addadvance_a', addAdvanceARouter);
app.use('/addposttag', addposttagRouter);
app.use('/getchatroommessages', getChatroomMessagesRouter);
app.use('/getscrap', getscrapRouter);
app.use('/getadvance_q', getAdvanceQRouter);
app.use('/addapplication', addapplicationRouter);
app.use('/getstudymembers', getStudyMembersRouter);
app.use('/checkreview', checkReviewRouter);
app.use('/patchpostprogress', patchpostprogressRouter);
app.use('/getapplicants', getapplicantsRouter);
app.use('/patchapplicantstatus', patchapplicantstatusRouter);
app.use('/getadvanceanswer', getadvanceanswerRouter);
app.use('/getquestions', getquestionsRouter);
app.use('/addanswer', addanswerRouter);
app.use('/addquestion', addquestionRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/getchatroommembers', getChatroomMembersRouter);
app.use('/leaveroom', leaveRoomRouter);
app.use('/checkhost', checkhostRouter);
app.use('/checkApplication', checkApplicationRouter);

app.get('/', (req, res) => res.send('Hello World!'));


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
