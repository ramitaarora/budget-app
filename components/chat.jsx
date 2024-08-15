import React, { useState } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const messageToSend = {
            message: inputMessage
        };

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageToSend)
            });

            const data = await res.json();
            if (res.ok) {
                setMessages(messages => [...messages, { text: inputMessage, from: 'user' }, { text: data.response, from: 'gpt' }]);
                setInputMessage('');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const options = [
        { id: 1, text: "Check my expenses", prompt: "Please show me my expenses for this month." },
        { id: 2, text: "Budget suggestions", prompt: "What budgeting tips do you have?" }
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option.id);
        sendMessage(option.prompt);
    };

    return (
        <div className='chat-container'>
            <div className='messages message-container'>
                <p className="message-box message-sender-gpt">
                    Hello! I am here to answer any questions you may have. Feel free to ask me anything related to your finances, budget planning, expense tracking, etc.
                </p>
                <div>
                    {options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                {messages.map((msg, index) => (
                    <p key={index} className={`message-box message-sender-${msg.from}`}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <div className="send-container">
                <input
                    className="send-box"
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage} className="send-button">
                    <img src="./send.png" alt="Send Message" onClick={sendMessage} style={{ width: "20px", height: "auto", margin: "5px" }} />
                </button>
            </div>
        </div>
    );
}