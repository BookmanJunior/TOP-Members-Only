import { useState, useEffect } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { UserProps } from "../Types";
import "../styles/App.css";

type ContextType = {
  user: UserProps;
  setUser: (user: UserProps) => void;
};

export default function Root() {
  const [user, setUser] = useState<UserProps | null>(null);
  const navigate = useNavigate();

  //login user automatically if jwt token exists.
  useEffect(() => {
    async function auth() {
      try {
        const res = await fetch(
          "https://top-members-only-api.fly.dev/auth/automatic-login",
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
          navigate("/message-board");
        }
      } catch (error) {
        console.log(error);
      }
    }

    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Outlet
        context={{
          user,
          setUser,
        }}
      />
    </>
  );
}

export function RootStates() {
  return useOutletContext<ContextType>();
}
