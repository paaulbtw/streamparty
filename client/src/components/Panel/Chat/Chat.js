import React, { useState, useEffect } from "react";
import Messages from './Messages/Messages';
import ChatInput from './ChatInput/ChatInput';
import { sckt } from '../../Socket';

import './Chat.css';

const Chat = ({ currUser, users }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handler = (message) => setMessages(messages => [...messages, message]);
        sckt.socket.on('message', handler);
        return () => sckt.socket.off('message', handler);
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        let trimmedMessage = message.trim();
        if (trimmedMessage.length > 0) {
            sckt.socket.emit('sendMessage', trimmedMessage, () => setMessage(''));
        }
    }

    return (
        <div className="chatContainer">
            <Messages messages={messages} currUser={currUser} users={users} />
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}

export default Chat;