import { useState, useEffect } from 'react';
import { db } from "./lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // READ: Listen for real-time updates from Firebase
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    // WRITE: Send a new message to Firebase
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input) return;
        await addDoc(collection(db, "messages"), {
            text: input,
            timestamp: new Date()
        });
        setInput("");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>ITC Project Chat</h1>
            <form onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <button type="submit">testest</button>
            </form>

            <ul>
                {messages.map(msg => (
                    <li key={msg.id}>{msg.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;