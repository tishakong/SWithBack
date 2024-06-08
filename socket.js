const db = require('./db.js');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('fetchChatRooms', (data) => { //chat.dart
            const userId = data.userId;
            if (!userId) {
                console.error('userId is required');
                return;
            }

            const chatRoomsQuery = `
                SELECT 
                    posts.study_name,
                    chat_rooms.room_id
                FROM 
                    chat_room_mem
                JOIN 
                    chat_rooms ON chat_room_mem.room_id = chat_rooms.room_id
                JOIN 
                    posts ON chat_rooms.post_id = posts.post_id
                WHERE 
                    chat_room_mem.member_id = ?
            `;

            db.query(chatRoomsQuery, [userId], (error, chatRooms) => {
                if (error) {
                    console.error('Error fetching chat rooms:', error);
                    return;
                }

                if (chatRooms.length === 0) {
                    socket.emit('chatRooms', { data: [] });
                    return;
                }

                const roomIds = chatRooms.map(room => room.room_id);
                const placeholders = roomIds.map(() => '?').join(',');
                const lastMessagesQuery = `
                    SELECT 
                        room_id,
                        content AS last_message,
                        chat_time AS last_message_time
                    FROM 
                        chats
                    WHERE 
                        room_id IN (${placeholders})
                    ORDER BY 
                        chat_time DESC
                `;

                db.query(lastMessagesQuery, roomIds, (error, lastMessages) => {
                    if (error) {
                        console.error('Error fetching last messages:', error);
                        return;
                    }

                    const lastMessagesMap = {};
                    lastMessages.forEach(msg => {
                        if (!lastMessagesMap[msg.room_id]) {
                            lastMessagesMap[msg.room_id] = msg;
                        }
                    });

                    const results = chatRooms.map(room => ({
                        study_name: room.study_name,
                        room_id: room.room_id,
                        last_message: lastMessagesMap[room.room_id]?.last_message || null,
                        last_message_time: lastMessagesMap[room.room_id]?.last_message_time || null,
                    })).sort((a, b) => {
                        const timeA = a.last_message_time ? new Date(a.last_message_time) : new Date(0);
                        const timeB = b.last_message_time ? new Date(b.last_message_time) : new Date(0);
                        return timeB - timeA;
                    });

                    socket.emit('chatRooms', { data: results });
                });
            });
        });

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId); //방에 참가
            console.log(`User joined room: ${roomId}`);

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
                socket.emit('chatHistory', { data: results.reverse() }); //채팅 내역 전송
            });
        });

        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId);
            console.log(`User left room: ${roomId}`);
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

        socket.on('chatMessage', (msg) => { //새로운 메시지 데이터 수신
            const { roomId, sender_id, content, chat_time } = msg;
            const query = 'INSERT INTO chats (room_id, sender_id, content, chat_time) VALUES (?, ?, ?, ?)';
            db.query(query, [roomId, sender_id, content, chat_time], (error, results) => {
                if (error) {
                    console.error('Error saving message:', error);
                    return;
                }
                io.to(roomId).emit('chatMessage', msg); // 같은 방의 다른 user들의 클라이언트로 데이터를 전송
                
                // 모든 클라이언트에게 새로운 메시지 알림
                io.emit('newMessage', {
                    room_id: roomId,
                    last_message: content,
                    last_message_time: chat_time,
                });
            });
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
