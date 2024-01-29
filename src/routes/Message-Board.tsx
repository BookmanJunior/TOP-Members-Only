import { useState, useEffect, useRef, createRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/message-board.css";

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
    <div className="message-board">
      <Messages messages={messages} user={user} setMessages={setMessages} />
      <footer>
        <div className="footer__wrapper">
          <Nav user={user} />
          <MessageForm setMessages={setMessages} user={user} />
        </div>
      </footer>
    </div>
  );
}

function MessageForm({ setMessages, user }) {
  const [userMessage, setUserMessage] = useState("");
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [errors, setErrors] = useState();
  const formRef = useRef<HTMLFormElement>(null);
  const charactersLeft = 150 - userMessage.length;

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
      // edit message to include username
      const editedData = { ...data, user: user };
      setMessages((prev) => [editedData, ...prev]);
      setUserMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setMessageSubmitted(false);
    }
  }

  return (
    <>
      <form
        className="message-form"
        onSubmit={handleMessageSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
        ref={formRef}
      >
        <div className="textarea-grow-wrap">
          <textarea
            name="message"
            rows={1}
            maxLength={150}
            placeholder="Your message here..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          ></textarea>
          <span className="textarea__grow" aria-hidden="true">
            {`${userMessage} " "`}
          </span>
        </div>
        {/* <span className="message__word-count">{charactersLeft}</span> */}
        {errors && (
          <ul className="errors">
            {errors.map((error) => (
              <li className="error-msg" key={error.path}>
                {error.msg}
              </li>
            ))}
          </ul>
        )}
        <button disabled={messageSubmitted}>Post</button>
      </form>
    </>
  );
}

function Messages({ messages, user, setMessages }) {
  useEffect(() => {
    if (messages.length) {
      messageEndRef.current?.scrollIntoView();
    }
  }, [messages.length]);

  const messageEndRef = useRef();
  return messages.length ? (
    <>
      <div className="messages">
        {messages.map((message) => {
          return (
            <Message
              key={message.date + message._id}
              message={message}
              user={user}
              setMessages={setMessages}
            />
          );
        })}
      </div>
      <div ref={messageEndRef} className="scroll__to__bottom"></div>
    </>
  ) : (
    <span className="no-messages-text">No Messages</span>
  );
}

function Message({ message, user, setMessages }) {
  const isUserAdmin = user?.admin;
  const userAvatar = `avatars/${message?.user?.avatar}.svg`;
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
      <div className="message">
        <div className="user-info__message">
          <img
            src={userAvatar}
            alt="user avatar"
            className="avatar avatar__message"
          />
          <div className="username__message">{message?.user?.username}</div>
        </div>
        <div
          className={`user__message user__message--${message?.user?.avatar}`}
        >
          {message.message}
        </div>
        {isUserAdmin && (
          <form className="message__delete-form" onSubmit={handleMessageDelete}>
            <button disabled={deletingMessageStatus}>Delete</button>
          </form>
        )}
      </div>
    </>
  );
}
