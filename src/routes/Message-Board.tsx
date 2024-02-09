import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RootStates } from "./root";
import { UserProps } from "../Types";
import Nav from "../components/Nav";
import getAvatarUrl from "../avatar-util.js";
import "../styles/message-board.css";

type messageProps = {
  _id: string;
  date: Date;
  message: string;
  user: UserProps;
};

type setMessagesProps = {
  setMessages: (messages: messageProps[]) => void;
};

type MessagesProps = {
  messages: messageProps[];
  user: UserProps;
} & setMessagesProps;

type MessageProps = {
  message: messageProps;
  user: UserProps;
} & setMessagesProps;

export default function MessageBoard() {
  const [messages, setMessages] = useState<messageProps[]>([]);
  const navigate = useNavigate();
  const { user, setUser } = RootStates();

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

        if (res.status >= 400) {
          navigate("/");
          return;
        }

        const data = await res.json();
        setMessages(data.messages);
        !user && setUser(data.user);
      } catch (error) {
        console.log(error);
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
          <MessageForm setMessages={setMessages} />
        </div>
      </footer>
    </div>
  );
}

function MessageForm({ setMessages }: setMessagesProps) {
  const [userMessage, setUserMessage] = useState("");
  const [errors, setErrors] = useState<{ path: string; msg: string }[] | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const charactersLeft = 150 - userMessage.length;

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://top-members-only-api.fly.dev/message-board",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (res.status >= 400) {
        const errorData = await res.json();
        setErrors(errorData);
        return;
      }

      const data = await res.json();
      setMessages(data);
      setUserMessage("");
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <>
      <form
        className="message-form"
        onSubmit={handleMessageSubmit}
        ref={formRef}
      >
        <div className="textarea-grow-wrap">
          <textarea
            name="message"
            rows={1}
            maxLength={150}
            placeholder="Message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleEnter}
          ></textarea>
          <span className="textarea__grow" aria-hidden="true">
            {`${userMessage} " "`}
          </span>
        </div>
        <span className="message__word-count">{charactersLeft}</span>
        {errors && (
          <ul className="errors">
            {errors.map((error) => (
              <li className="error-msg" key={error.path}>
                {error.msg}
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}

function Messages({ messages, user, setMessages }: MessagesProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length) {
      messageEndRef.current?.scrollIntoView();
    }
  }, [messages.length]);

  return (
    <div className="messages">
      {messages.length ? (
        <>
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
          <div ref={messageEndRef} className="scroll__to__bottom"></div>
        </>
      ) : (
        Array.from({ length: 9 }).map((_val, index) => {
          return <SkeletonMessage key={index} />;
        })
      )}
    </div>
  );
}

function Message({ message, user, setMessages }: MessageProps) {
  const isUserAdmin = user?.admin;
  const userAvatar = getAvatarUrl(`${message?.user?.avatar}.svg`);
  const messageCredentials = {
    messageId: message._id,
  };
  const [deletingMessageStatus, setDeletingMessageStatus] = useState(false);

  async function handleMessageDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDeletingMessageStatus(true);

    try {
      const res = await fetch(
        `https://top-members-only-api.fly.dev/message-board/${message._id}/delete`,
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
        <div className="message__user-info">
          <img
            src={userAvatar}
            alt="user avatar"
            className="message__avatar avatar"
          />
          <div className="message__username">{message?.user?.username}</div>
        </div>
        <div
          className={`message__bubble message__bubble--${message?.user?.avatar}`}
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

function SkeletonMessage() {
  return (
    <div className="message skeleton-message">
      <div className="message__user-info skeleton-message__user-info">
        <div className="message__avatar skeleton-message__avatar skeleton"></div>
        <div className="message__username skeleton-message__username skeleton"></div>
      </div>
      <div
        className={`message__bubble skeleton-message__bubble skeleton`}
      ></div>
    </div>
  );
}
