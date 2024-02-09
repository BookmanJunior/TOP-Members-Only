import { useState } from "react";
import Logo from "../assets/logo-durarara.svg";
import AvatarPicker from "../components/AvatarPicker";
import Auth from "../components/AuthFetch";
import ValidationError from "../components/ValidationErrorMsg";
import "../styles/sign-up.css";

export default function SignUp() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const { loading, error, handleSubmit } = Auth(
    "https://top-members-only-api.fly.dev/sign-up",
    userCredentials
  );

  function handleCredentialsChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) {
    setUserCredentials({ ...userCredentials, [prop]: e.target.value });
  }

  return (
    <>
      <img src={Logo} alt="dollars logo" className="logo logo-sign-up" />
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => handleCredentialsChange(e, "username")}
          autoComplete="username"
        />
        <ValidationError errors={error?.username} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => handleCredentialsChange(e, "password")}
          autoComplete="new-password"
        />
        <ValidationError errors={error?.password} />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          onChange={(e) => handleCredentialsChange(e, "confirmPassword")}
          autoComplete="new-password"
        />
        <ValidationError errors={error?.confirmPassword} />
        <AvatarPicker handleCredentialsChange={handleCredentialsChange} />
        <ValidationError errors={error?.avatar ?? error?.network} />
        <button
          className={`sign-up-btn ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Register
        </button>
      </form>
    </>
  );
}
