import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Logo from "../assets/logo-durarara.svg";
import AvatarPicker from "../components/AvatarPicker";
import "../styles/style.css";

export default function SignUp() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    "confirm-password": "",
    avatar: "",
  });
  const [errors, setErrors] = useState();
  const { setUser } = useOutletContext();
  const [submittedSignUp, setSubmittedSignUp] = useState(false);
  const navigate = useNavigate();

  function handleCredentialsChange(e, prop) {
    setUserCredentials({ ...userCredentials, [prop]: e.target.value });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setSubmittedSignUp(true);

    try {
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      if (res.status >= 400) {
        const err = await res.json();
        setErrors(
          err.reduce((errorObj, next) => {
            errorObj[next.path] ??= [];
            errorObj[next.path].push(next.msg);
            return errorObj;
          }, {})
        );
        return;
      }

      const { user } = await res.json();
      setUser(user);
      navigate("/message-board");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittedSignUp(false);
    }
  }

  return (
    <>
      <img src={Logo} alt="dollars logo" className="logo logo-sign-up" />
      <form
        onSubmit={handleSignUp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          textAlign: "left",
          width: "350px",
        }}
        className="sign-up-from"
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => handleCredentialsChange(e, "username")}
        />
        <ValidationError errors={errors} errorPath={"username"} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => handleCredentialsChange(e, "password")}
        />
        <ValidationError errors={errors} errorPath={"password"} />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => handleCredentialsChange(e, "confirm-password")}
        />
        <ValidationError errors={errors} errorPath={"confirm-password"} />
        <AvatarPicker handleCredentialsChange={handleCredentialsChange} />
        <button disabled={submittedSignUp}>Register</button>
      </form>
    </>
  );
}

function ValidationError({ errors, errorPath }) {
  return (
    errors && (
      <ul className="validation-errors">
        {errors[errorPath] !== undefined &&
          errors[errorPath].map((err, index) => (
            <li key={errors[errorPath] + index}>{err}</li>
          ))}
      </ul>
    )
  );
}
