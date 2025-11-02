import { useState } from "react";

export default function LoginPage({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let user;
            const endpoint = isRegister ? "register" : "login"; // scegli endpoint
            const res = await fetch(`https://natura-ai-server.ing-v-catalano.workers.dev/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            user = data.user;

            setUser(user); // salva utente nello stato di App.jsx
        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h3 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control mb-3"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="form-control mb-3"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="btn btn-primary w-100">
                            {isRegister ? "Sign up" : "Log in"}
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        {isRegister ? "Already have an account?" : "No account?"}{" "}
                        <button
                            className="btn btn-link p-0"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
