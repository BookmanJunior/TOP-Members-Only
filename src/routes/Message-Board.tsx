import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MessageBoard() {
  const [messages, setMessages] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          "https://top-members-only-api.fly.dev/message-board",
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }

        if (res.status === 401 || res.status === 403) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {messages
        ? messages.map((message) => {
            return (
              <Message key={message.date + message._id} message={message} />
            );
          })
        : "No Messages"}
    </div>
  );
}

function Message({ message }) {
  return (
    <div className="user-message">
      <div>{message.user.username}</div>
      <div>{message.message}</div>
      <div>{message.date}</div>
    </div>
  );
}
