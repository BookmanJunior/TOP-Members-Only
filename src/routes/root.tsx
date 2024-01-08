import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";

export default function Root() {
  const [token, setToken] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://top-members-only-api.fly.dev/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        navigate("/message-board");
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet
        context={{ token, setToken, credentials, setCredentials, login }}
      />
    </>
  );
}
