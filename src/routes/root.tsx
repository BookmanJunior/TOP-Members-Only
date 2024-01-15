import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";

export default function Root() {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet
        context={{
          user,
          setUser,
          setLoading,
          setError,
          error,
        }}
      />
    </>
  );
}
