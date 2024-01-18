import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  async function handleLogOut(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status >= 400) {
        return console.log("error");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleLogOut}>
      <button>Log Out</button>
    </form>
  );
}
