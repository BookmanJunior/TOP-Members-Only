// import { useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-durarara.svg";
import AvatarPicker from "../components/AvatarPicker";
import Auth from "../components/AuthFetch";
import {
  PasswordInput,
  UsernameInput,
  FormButton,
} from "../components/FormInputs";
import ValidationError from "../components/ValidationErrorMsg";
import "../styles/sign-up.css";

export default function SignUp() {
  const apiEndpoint = "https://top-members-only-api.fly.dev/sign-up";
  const { loading, error, handleSubmit } = Auth(apiEndpoint);

  return (
    <>
      <Link to="/">
        <img src={Logo} alt="dollars logo" className="logo logo-sign-up" />
      </Link>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <UsernameInput name="username" minLength={4} maxLength={13} required>
          <ValidationError errors={error?.username} />
        </UsernameInput>
        <PasswordInput name="password" minLength={8} required>
          <ValidationError errors={error?.password} />
        </PasswordInput>
        <PasswordInput
          name="confirmPassword"
          title="confirm password"
          minLength={8}
          required
        >
          <ValidationError errors={error?.confirmPassword} />
        </PasswordInput>
        <AvatarPicker />
        <ValidationError errors={error?.avatar ?? error?.network} />
        <FormButton loading={loading} className="sign-up-btn">
          Sign Up
        </FormButton>
      </form>
    </>
  );
}
