import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessage] = useState(false);
  const navigate = useNavigate();

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
      <MessageForm setMessages={setMessages} />
      {loadingMessages
        ? "Loading"
        : messages.length
        ? messages.map((message) => {
            return (
              <Message key={message.date + message._id} message={message} />
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

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [data, ...prev]);
        setUserMessage("");
      }

      if (res.status >= 400) {
        const errorData = await res.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMessageSubmitted(false);
    }
  }

  return (
    <form onSubmit={handleMessageSubmit}>
      <textarea
        name=""
        id=""
        cols={30}
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

function Message({ message }) {
  return (
    <div className="user-message">
      <div>{message.user.username}</div>
      <div>{message.message}</div>
      <div>{message.date}</div>
    </div>
  );
}
