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
    "confirm-password": "",
    avatar: "",
  });
  const { loading, error, handleSubmit } = Auth(
    "http://localhost:3000/sign-up",
    userCredentials
  );

  function handleCredentialsChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) {
    setUserCredentials({ ...userCredentials, [prop]: e.target.value });
  }

  console.log(error);

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
        <ValidationError errors={error} errorPath={"username"} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => handleCredentialsChange(e, "password")}
          autoComplete="new-password"
        />
        <ValidationError errors={error} errorPath={"password"} />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => handleCredentialsChange(e, "confirm-password")}
          autoComplete="new-password"
        />
        <ValidationError errors={error} errorPath={"confirm-password"} />
        <AvatarPicker handleCredentialsChange={handleCredentialsChange} />
        <ValidationError errors={error} errorPath={"avatar"} />
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
