import { useState } from "react";
import Auth from "./AuthFetch";
import ValidationError from "./ValidationErrorMsg";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { loading, error, handleSubmit } = Auth(
    "http://localhost:3000/auth/login",
    credentials
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          autoComplete="username"
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
          autoComplete="current-password"
        />
        <ValidationError errors={error} errorPath={"login"} />
        <button
          className={`login-btn ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
}
