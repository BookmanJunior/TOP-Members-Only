import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { RootStates } from "./root";
import Logo from "../assets/logo-durarara.svg";

export default function Home() {
  const { user, setUser } = RootStates();
  const navigate = useNavigate();

  useEffect(() => {
    async function auth() {
      try {
        const res = await fetch("http://localhost:3000/auth/automatic-login", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
          navigate("/message-board");
        }
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
      <img src={Logo} alt="dollars logo" className="logo logo-home" />
      <LoginForm />
      <p>
        Don't have account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
}
