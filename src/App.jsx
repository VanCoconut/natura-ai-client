import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { useState } from "react";

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to="/chat" /> : <LoginPage setUser={setUser} />}
                />
                <Route
                    path="/chat"
                    element={user ? <ChatPage user={user} setUser={setUser} /> : <Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    );
}
