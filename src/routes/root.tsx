import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import "../styles/App.css";

type User = {
  username: string;
  admin: boolean;
  avatar: string;
  id: string;
};

type ContextType = {
  user: User;
  setUser: (user: User) => void;
};

export default function Root() {
  const [user, setUser] = useState<User | null>(null);

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
