import Auth from "./AuthFetch";
import { UsernameInput, PasswordInput, FormButton } from "./FormInputs";
import ValidationError from "./ValidationErrorMsg";

export default function LoginForm() {
  const apiEndpoint = "https://top-members-only-api.fly.dev/auth/login";
  const { loading, error, handleSubmit } = Auth(apiEndpoint);

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <UsernameInput name="username" />
        <PasswordInput name="password" />
        <ValidationError errors={error?.login ?? error?.network} />
        <FormButton loading={loading} className="login-btn">
          Login
        </FormButton>
      </form>
    </>
  );
}
