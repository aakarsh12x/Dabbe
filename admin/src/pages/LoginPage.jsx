import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, token, user } = useAuth();
  const [email, setEmail] = useState("admin@tiffin.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  if (token && user?.role === "ADMIN") {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin access</p>
        <h1>Tiffin Delivery Dashboard</h1>
        <p className="muted">Use the seeded admin account to manage the platform.</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error ? <p className="error-text">{error}</p> : null}
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
