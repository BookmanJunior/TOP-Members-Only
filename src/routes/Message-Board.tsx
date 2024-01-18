import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import LogOut from "../components/LogOut";

export default function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessage] = useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    async function fetchMessages() {
      setLoadingMessage(true);
      try {
        const res = await fetch("http://localhost:3000/message-board", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }

        if (res.status === 401 || res.status === 403) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessage(false);
      }
    }

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <LogOut />
      <MessageForm setMessages={setMessages} />
      {loadingMessages
        ? "Loading"
        : messages.length
        ? messages.map((message) => {
            return (
              <Message
                key={message.date + message._id}
                message={message}
                user={user}
                setMessages={setMessages}
              />
            );
          })
        : "No Messages"}
    </div>
  );
}

function MessageForm({ setMessages }) {
  const [userMessage, setUserMessage] = useState("");
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [errors, setErrors] = useState();

  async function handleMessageSubmit(e) {
    e.preventDefault();
    setMessageSubmitted(true);

    try {
      const res = await fetch("http://localhost:3000/message-board", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (res.status >= 400) {
        const errorData = await res.json();
        setErrors(errorData);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [data, ...prev]);
      setUserMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setMessageSubmitted(false);
    }
  }

  return (
    <form
      onSubmit={handleMessageSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <textarea
        name=""
        id=""
        cols={50}
        rows={10}
        placeholder="Your message here..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      ></textarea>
      {errors && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error.path}>{error.msg}</li>
          ))}
        </ul>
      )}
      <button disabled={messageSubmitted}>Post</button>
    </form>
  );
}

function Message({ message, user, setMessages }) {
  const isUserAdmin = user.admin;
  const messageCredentials = {
    messageId: message._id,
  };
  const [deletingMessageStatus, setDeletingMessageStatus] = useState(false);

  async function handleMessageDelete(e) {
    e.preventDefault();
    setDeletingMessageStatus(true);

    try {
      const res = await fetch(
        `http://localhost:3000/message-board/${message._id}/delete`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageCredentials),
        }
      );

      if (res.status >= 400) {
        const data = await res.json();
        console.log(data);
        return;
      }

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingMessageStatus(false);
    }
  }

  return (
    <>
      <div className="user-message">
        <div>{message.user.username}</div>
        <div>{message.message}</div>
        <div>{message.date}</div>
      </div>
      {isUserAdmin && (
        <form onSubmit={handleMessageDelete}>
          <button disabled={deletingMessageStatus}>Delete</button>
        </form>
      )}
    </>
  );
}
