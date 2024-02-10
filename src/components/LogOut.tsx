import { useNavigate } from "react-router-dom";
import LogOutIcon from "../assets/logout-icon.svg?react";

export default function LogOut() {
  const navigate = useNavigate();
  async function handleLogOut(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      navigate("/");
      await fetch("https://top-members-only-api.fly.dev/auth/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("Logged out on client-side.");
    }
  }

  return (
    <form className="logout-form" onSubmit={handleLogOut}>
      <button className="logout__btn">
        <LogOutIcon />
      </button>
    </form>
  );
}
