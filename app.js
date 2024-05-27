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
const deletenotiRouter = require('./deletenoti');
const view_countRouter = require('./view_count');
const majorDetailRouter = require('./majorDetail');
const userPostsRouter = require('./userposts');
const userApplicationsRouter = require('./userapplications');
const majorRouter = require('./major.js');
const newchatroomRouter = require('./newchatroom.js');
const getchatroomsRouter = require('./getchatrooms.js');
const addAdvanceQRouter = require('./addadvance_q');
const addAdvanceARouter = require('./addadvance_a');
const addposttagRouter = require('./addposttag');
const getChatroomMessagesRouter = require('./getChatroomMessages.js');
const getscrapRouter = require('./getscrap');
const getAdvanceQRouter = require('./getadvance_q');
const addapplicationRouter = require('./addapplication');


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
app.use('/getchatrooms', getchatroomsRouter);
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


app.get('/', (req, res) => res.send('Hello World!'));

// Socket.io 설정 추가
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
  
        // Fetch chat history
        const query = `
            SELECT c.sender_id, c.chat_time, c.content, u.nickname 
            FROM chats c
            JOIN users u ON c.sender_id = u.user_id
            WHERE c.room_id = ?
            ORDER BY c.chat_time DESC
            LIMIT 20
        `;
  
        db.query(query, [roomId], (error, results) => {
            if (error) {
                console.error('Error fetching chat history:', error);
                return;
            }
            socket.emit('chatHistory', { data: results.reverse() });
        });
    });
  
    socket.on('getChatHistory', (data) => {
        const { roomId, limit, lastMessageTime } = data;
        const query = `
            SELECT c.sender_id, c.chat_time, c.content, u.nickname 
            FROM chats c
            JOIN users u ON c.sender_id = u.user_id
            WHERE c.room_id = ? AND c.chat_time < ?
            ORDER BY c.chat_time DESC
            LIMIT ?
        `;
  
        db.query(query, [roomId, lastMessageTime, limit], (error, results) => {
            if (error) {
                console.error('Error fetching chat history:', error);
                return;
            }
            socket.emit('chatHistory', { data: results.reverse() });
        });
    });
  
    socket.on('chatMessage', (msg) => {
        const { roomId, sender_id, nickname, content, chat_time } = msg;
        const query = 'INSERT INTO chats (room_id, sender_id, content, chat_time) VALUES (?, ?, ?, ?)';
        db.query(query, [roomId, sender_id, content, chat_time], (error, results) => {
            if (error) {
                console.error('Error saving message:', error);
                return;
            }
            io.to(roomId).emit('chatMessage', msg);
        });
    });
  
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
  
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
