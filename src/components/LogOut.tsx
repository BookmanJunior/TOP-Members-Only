import { useNavigate } from "react-router-dom";
import LogOutIcon from "../assets/logout-icon.svg?react";

export default function LogOut() {
  const navigate = useNavigate();
  async function handleLogOut(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://top-members-only-api.fly.dev/auth/logout",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status >= 400) {
        return console.log("error");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
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
