import { useState } from "react";

export default function ChatPage({ user, setUser }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // aggiungi messaggio utente alla chat locale
        setMessages([...messages, { sender: "user", text: input }]);

        try {
            const res = await fetch('https://natura-ai-server.ing-v-catalano.workers.dev/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, message: input })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // aggiungi risposta del bot
            setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
        } catch (err) {
            alert(err.message);
        }

        setInput(""); // reset input
    };

    const handleLogout = () => {
        setUser(null);      // pulisci utente
        setMessages([]);    // opzionale: reset chat
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Chatbot</h4>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            <div className="border rounded p-3 mb-3" style={{height:"60vh", overflowY:"auto"}}>
                {messages.map((m, i) => (
                    <div key={i} className={`mb-2 ${m.sender === "user" ? "text-end" : ""}`}>
                        <span className={`badge ${m.sender === "user" ? "bg-primary" : "bg-secondary"}`}>
                            {m.text}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="d-flex">
                <input
                    className="form-control me-2"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-success">Send</button>
            </form>
        </div>
    );
}
