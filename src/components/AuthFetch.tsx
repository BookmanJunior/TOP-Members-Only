import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootStates } from "../routes/root";

type errorTypes = {
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
  avatar?: string[];
  login?: string[];
  network?: string[];
};

export default function Auth(endpoint: string, body: object) {
  const { setUser } = RootStates();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<errorTypes | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status >= 400) {
        const errors = await res.json();
        setError(
          errors.reduce(
            (
              errorObj: { [x: string]: string[] },
              error: { path: string; msg: string }
            ) => {
              errorObj[error.path] ??= [];
              errorObj[error.path].push(error.msg);
              return errorObj;
            },
            {}
          )
        );
        return;
      }

      const { user } = await res.json();
      setUser(user);
      navigate("/message-board");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError({ network: [error.message] });
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
