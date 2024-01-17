import { useOutletContext, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

export default function Home() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function auth() {
      try {
        const res = await fetch("http://localhost:3000/automatic-login", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status >= 400) {
          navigate("/");
          return;
        }

        const { user } = await res.json();
        setUser(user);
        navigate("/message-board");
      } catch (error) {
        navigate("/");
      }
    }

    if (!user) {
      auth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <LoginForm />
    </>
  );
}
