import React, { useState, useEffect } from 'react';

export default function Chat({ month, year }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [optionMessage, setOptionMessage] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [autoSendEnabled, setAutoSendEnabled] = useState(false);

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

    const autoSendMessage = async () => {
        if (optionMessage.trim() === '') return;

        const messageToSend = {
            message: optionMessage
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
                setMessages(messages => [...messages, { text: data.response, from: 'gpt' }]);
                setOptionMessage('');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }

        setAutoSendEnabled(false);
    };

    const options = [
        { id: 1, text: "Analyze Spending Habits", prompt: "Please analyze my spending habits based on this data of my expenses this month. Suggest ways that I can save and better spend my money.", fetch: "Expenses" }
    ];

    const fetchExpenses = async () => {
        try {
            const res = await fetch(`/api/expenses?month=${month}&year=${year}&limit=5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch expenses data');
            };

            const data = await res.json();
            setSelectedData(data);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    useEffect(() => {
        if (selectedPrompt && selectedData) {
            setOptionMessage(`${selectedPrompt} Use this data: ${JSON.stringify(selectedData)}`);
            setAutoSendEnabled(true);
        }
    }, [selectedPrompt, selectedData]);

    useEffect(() => {
        if (optionMessage && autoSendEnabled) {
            autoSendMessage();
        }
    }, [autoSendEnabled]);

    const handleOptionClick = async (option) => {
        setSelectedPrompt(option.prompt);

        switch (option.fetch) {
            case 'Expenses':
                return fetchExpenses();
        }

        setInputMessage(selectedPrompt + selectedData);
        console.log(inputMessage);
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
                    <img src="./send.png" alt="Send Message" style={{ width: "20px", height: "auto", margin: "5px" }} />
                </button>
            </div>
        </div>
    );
}