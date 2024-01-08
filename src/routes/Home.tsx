import { useOutletContext, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <LoginForm />
      <Link to="message-board">Message Board</Link>
    </>
  );
}

function LoginForm() {
  const { login, credentials, setCredentials } = useOutletContext();
  return (
    <>
      <form onSubmit={login}>
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
        <button>Login</button>
      </form>
    </>
  );
}
