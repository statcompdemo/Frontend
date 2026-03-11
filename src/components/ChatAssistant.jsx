import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(true); // Open by default based on request, or allow toggle
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! 👋 How can I help you today?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, text: "I'm just a demo assistant for now!", sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
                <MessageCircle size={24} />
            </button>
        );
    }

    return (
        <div className="chat-widget">
            <div className="chat-header">
                <h3>Chatbot Assistant</h3>
                <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
                    <X size={18} />
                </button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="chat-send-btn" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatAssistant;

