import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import blue from "../assets/profile-pictures/blue.svg";
import orange from "../assets/profile-pictures/orange.svg";
import gray from "../assets/profile-pictures/gray.svg";
import green from "../assets/profile-pictures/green.svg";
import red from "../assets/profile-pictures/red.svg";
import pink from "../assets/profile-pictures/pink.svg";
import brown from "../assets/profile-pictures/brown.svg";
import lime from "../assets/profile-pictures/lime.svg";
import "../styles/style.css";

export default function SignUp() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    "confirm-password": "",
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
    <form
      onSubmit={handleSignUp}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        textAlign: "left",
        width: "350px",
      }}
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
      <section role="radiogroup" className="profile-pictures">
        <p>Pick a profile pictures: </p>
        <div className="profile-pictures-wrapper">
          <ProfilePicture value="blue" src={blue} />
          <ProfilePicture value="orange" src={orange} />
          <ProfilePicture value="red" src={red} />
          <ProfilePicture value="pink" src={pink} />
          <ProfilePicture value="green" src={green} />
          <ProfilePicture value="gray" src={gray} />
          <ProfilePicture value="brown" src={brown} />
          <ProfilePicture value="lime" src={lime} />
        </div>
      </section>
      <button disabled={submittedSignUp}>Register</button>
    </form>
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

function ProfilePicture({ value, src }) {
  return (
    <label htmlFor={`pfp-${value}`} className={`pfp-container pfp-${value}`}>
      <img src={src} alt={`pfp-${value}`} />
      <input
        type="radio"
        name="profile-picture"
        id={`pfp-${value}`}
        className={`pfp-btn pfp-${value}`}
        value={value}
      />
    </label>
  );
}
