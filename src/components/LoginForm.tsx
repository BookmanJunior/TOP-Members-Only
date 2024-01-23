import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { setLoading, setError, setUser, error } = useOutletContext();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
        navigate("/message-board");
      }

      if (res.status >= 400) {
        const errorMessage = await res.json();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={login} className="login-form">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {error && <span className="error-msg">{error.message}</span>}
        <button>Login</button>
      </form>
    </>
  );
}
