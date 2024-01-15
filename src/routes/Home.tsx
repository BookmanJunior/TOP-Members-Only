import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <>
      <LoginForm />
      <Link to="message-board">Message Board</Link>
    </>
  );
}
