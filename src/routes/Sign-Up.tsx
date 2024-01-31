import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Logo from "../assets/logo-durarara.svg";
import AvatarPicker from "../components/AvatarPicker";
import "../styles/sign-up.css";

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

  function handleCredentialsChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) {
    setUserCredentials({ ...userCredentials, [prop]: e.target.value });
  }

  async function handleSignUp(e: React.ChangeEvent<HTMLFormElement>) {
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
      <form onSubmit={handleSignUp} className="sign-up-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => handleCredentialsChange(e, "username")}
          autoComplete="username"
        />
        <ValidationError errors={errors} errorPath={"username"} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => handleCredentialsChange(e, "password")}
          autoComplete="new-password"
        />
        <ValidationError errors={errors} errorPath={"password"} />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => handleCredentialsChange(e, "confirm-password")}
          autoComplete="new-password"
        />
        <ValidationError errors={errors} errorPath={"confirm-password"} />
        <AvatarPicker handleCredentialsChange={handleCredentialsChange} />
        <ValidationError errors={errors} errorPath={"avatar"} />
        <button disabled={submittedSignUp}>Register</button>
      </form>
    </>
  );
}

function ValidationError({ errors, errorPath }) {
  return (
    errors && (
      <ul className="error-msgs">
        {errors[errorPath] !== undefined &&
          errors[errorPath].map((err, index) => (
            <li key={errors[errorPath] + index} className="error-msg">
              {err}
            </li>
          ))}
      </ul>
    )
  );
}
