import { useState, useRef } from "react";
import { setMessagesProps } from "../types/messageTypes";

type MessageFormProps = {
  setNewMessage: (message: string) => void;
} & setMessagesProps;

export function MessageForm({ setMessages, setNewMessage }: MessageFormProps) {
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
      setMessages(data.messages);
      setNewMessage(data.newMessage);
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
