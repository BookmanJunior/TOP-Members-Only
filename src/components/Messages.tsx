import { useState, useEffect, useRef } from "react";
import { messageProps, setMessagesProps } from "../types/messageTypes";
import { UserProps } from "../types/UserTypes";
import getAvatarUrl from "../avatar-util";

type MessagesProps = {
  messages: messageProps[];
  user: UserProps;
  newMessage: string;
} & setMessagesProps;

type MessageProps = {
  message: messageProps;
  isNewMessage: string;
  user: UserProps;
} & setMessagesProps;

type DeleteButtonProps = {
  message: messageProps;
} & setMessagesProps;

export function Messages({
  user,
  messages,
  setMessages,
  newMessage,
}: MessagesProps) {
  return (
    <div className="messages">
      {messages.length ? (
        <>
          {messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              setMessages={setMessages}
              isNewMessage={newMessage === message._id ? newMessage : ""}
              user={user}
            />
          ))}
          <ScrollToFirstMessage messages={messages} />
        </>
      ) : (
        Array.from({ length: 9 }).map((_val, index) => {
          return <SkeletonMessage key={index} />;
        })
      )}
    </div>
  );
}

function Message({ message, isNewMessage, setMessages, user }: MessageProps) {
  const isUserAdmin = user?.admin;

  return (
    <>
      <div className={`message`}>
        <MessageUser message={message} />
        <MessageBubble message={message} isNewMessage={isNewMessage} />
        {isUserAdmin && (
          <MessageDeleteButton setMessages={setMessages} message={message} />
        )}
      </div>
    </>
  );
}

function MessageUser({ message }: { message: messageProps }) {
  const userAvatar = getAvatarUrl(`${message?.user?.avatar}.svg`);
  return (
    <div className="message__user-info">
      <img
        src={userAvatar}
        alt="user avatar"
        className="message__avatar avatar"
      />
      <div className="message__username">{message?.user?.username}</div>
    </div>
  );
}

function MessageBubble({
  message,
  isNewMessage,
}: {
  message: messageProps;
  isNewMessage: string;
}) {
  return (
    <div
      className={`message__bubble message__bubble--${message?.user?.avatar} ${
        isNewMessage ? "new-message" : ""
      }`}
    >
      {message.message}
    </div>
  );
}

function MessageDeleteButton({ message, setMessages }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleMessageDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://top-members-only-api.fly.dev/message-board/${message._id}/delete`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message.user.username),
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
      setLoading(false);
    }
  }

  return (
    <form className="message__delete-form" onSubmit={handleMessageDelete}>
      <button disabled={loading}>Delete</button>
    </form>
  );
}

function ScrollToFirstMessage({ messages }: { messages: messageProps[] }) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length) {
      messageEndRef.current?.scrollIntoView();
    }
  }, [messages.length]);

  return <div ref={messageEndRef} className="scroll__to__bottom"></div>;
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
