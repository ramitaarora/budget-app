import React, { useState } from 'react';

export default function Chat({ month, year }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        setIsLoading(true);

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
        } finally {
            setIsLoading(false);
        }
    };

    const autoSendMessage = async (message) => {
        if (message.trim() === '') return;

        setIsLoading(true);

        const messageToSend = {
            message: message
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
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const options = [
        {
            id: 1,
            text: "Analyze Spending Habits",
            prompt: "Please analyze my spending habits based on this data of my expenses this month. Suggest ways that I can save and better spend my money. Don't re-list my expenses in your response; I have this data available to me already. If no data is provided here, please let me know that there is no data to work. Let me know that I need to select a month that contains saved expenses.",
            fetch: "Expenses"
        },
        // {
        //     id: 2,
        //     text: "Analyze Spending Habits",
        //     prompt: "Please analyze my spending habits based on this data of my expenses this month. Suggest ways that I can save and better spend my money. Don't re-list my expenses in your response; I have this data available to me already. If no data is provided here, please let me know that there is no data to work. Let me know that I need to select a month that contains saved expenses.",
        //     fetch: "Expenses"
        // }
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

            const data = res.json();

            return data;
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    const handleOptionClick = async (option) => {
        const prompt = option.prompt;

        let data;
        switch (option.fetch) {
            case 'Expenses':
                data = await fetchExpenses();
        }

        const input = prompt + 'Data: ' + JSON.stringify(data);

        autoSendMessage(input);
    };

    return (
        <div className='chat-container'>
            <div className='messages message-container'>
                <p className="message-box message-sender-gpt">
                    Hello! I am here to answer any questions you may have. Feel free to ask me anything related to your finances, budget planning, expense tracking, etc.
                </p>
                {/* <div>
                    <p style={{ padding: '10px', fontWeight: 'bold' }}>Suggestions:</p>
                    {options.map(option => (
                        <button
                            key={option.id}
                            className='option-button'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div> */}
                {messages.map((msg, index) => (
                    <p key={index} className={`message-box message-sender-${msg.from}`}>
                        {msg.text}
                    </p>
                ))}
                <div>
                    <p style={{ padding: '10px', fontWeight: 'bold' }}>Suggestions:</p>
                    {options.map(option => (
                        <button
                            key={option.id}
                            className='option-button'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                {
                    isLoading
                    &&
                    <img src="./soon.gif" alt="Loading Icon" style={{ width: "100px", height: "auto", margin: "5px" }} />
                }
            </div>
            <div className="send-container">
                <input
                    className="send-box"
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage} className="send-button">
                    <img src="./send.png" alt="Send Message" style={{ width: "20px", height: "auto", margin: "5px" }} />
                </button>
            </div>
        </div>
    );
}