// const express = require('express');
// const router = express.Router();
// const db = require('./db');
//const io = require('socket.io')(server); // 서버에 Socket.io 추가

// router.post('/', (req, res) => {
//   const { userId } = req.body;
//   if (!userId) {
//     return res.status(400).send('user_id is required');
//   }

//   const chatRoomsQuery = `
//     SELECT 
//       posts.study_name,
//       chat_rooms.room_id
//     FROM 
//       chat_room_mem
//     JOIN 
//       chat_rooms ON chat_room_mem.room_id = chat_rooms.room_id
//     JOIN 
//       posts ON chat_rooms.post_id = posts.post_id
//     WHERE 
//       chat_room_mem.member_id = ?
//   `;

//   db.query(chatRoomsQuery, [userId], (error, chatRooms) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Database query error');
//     }

//     if (chatRooms.length === 0) {
//       return res.status(404).send('No records found');
//     }

//     const roomIds = chatRooms.map(room => room.room_id);
//     const placeholders = roomIds.map(() => '?').join(',');
//     const lastMessagesQuery = `
//       SELECT 
//         room_id,
//         content AS last_message,
//         chat_time AS last_message_time
//       FROM 
//         chats
//       WHERE 
//         room_id IN (${placeholders})
//       ORDER BY 
//         chat_time DESC
//     `;

//     db.query(lastMessagesQuery, roomIds, (error, lastMessages) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send('Database query error');
//       }

//       const lastMessagesMap = {};
//       lastMessages.forEach(msg => {
//         if (!lastMessagesMap[msg.room_id]) {
//           lastMessagesMap[msg.room_id] = msg;
//         }
//       });

//       const results = chatRooms.map(room => ({
//         study_name: room.study_name,
//         room_id: room.room_id,
//         last_message: lastMessagesMap[room.room_id]?.last_message || null,
//         last_message_time: lastMessagesMap[room.room_id]?.last_message_time || null,
//       })).sort((a, b) => {
//         const timeA = a.last_message_time ? new Date(a.last_message_time) : new Date(0);
//         const timeB = b.last_message_time ? new Date(b.last_message_time) : new Date(0);
//         return timeB - timeA;
//       });

//       res.status(200).json({ status: 200, data: results });
//     });
//   });
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('sendMessage', (data) => {
//     const { roomId, sender_id, content, chat_time } = data;

//     const insertMessageQuery = `
//       INSERT INTO chats (room_id, sender_id, content, chat_time)
//       VALUES (?, ?, ?, ?)
//     `;

//     db.query(insertMessageQuery, [roomId, sender_id, content, chat_time], (error, results) => {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       const lastMessageQuery = `
//         SELECT 
//           room_id,
//           content AS last_message,
//           chat_time AS last_message_time
//         FROM 
//           chats
//         WHERE 
//           room_id = ?
//         ORDER BY 
//           chat_id DESC
//         LIMIT 1
//       `;

//       db.query(lastMessageQuery, [roomId], (error, lastMessage) => {
//         if (error) {
//           console.error(error);
//           return;
//         }

//         const updatedMessage = lastMessage[0];
//         io.emit('newMessage', updatedMessage);
//       });
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// module.exports = router;
