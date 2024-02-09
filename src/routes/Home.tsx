import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Logo from "../assets/logo-durarara.svg";

export default function Home() {
  return (
    <>
      <Link to="/">
        <img src={Logo} alt="dollars logo" className="logo logo-home" />
      </Link>
      <LoginForm />
      <p>
        Don't have account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
}
