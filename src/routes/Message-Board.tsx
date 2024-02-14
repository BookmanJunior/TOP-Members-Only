import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootStates } from "./root";
import Nav from "../components/Nav";
import { Messages } from "../components/Messages";
import { MessageForm } from "../components/MessageForm";
import { messageProps } from "../types/messageTypes";
import "../styles/message-board.css";

export default function MessageBoard() {
  const [messages, setMessages] = useState<messageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
      <Messages
        messages={messages}
        setMessages={setMessages}
        newMessage={newMessage}
        user={user}
      />
      <MessageBoardFooter>
        <Nav user={user} />
        <MessageForm setMessages={setMessages} setNewMessage={setNewMessage} />
      </MessageBoardFooter>
    </div>
  );
}

function MessageBoardFooter({ children }: { children: React.ReactNode[] }) {
  return (
    <footer>
      <div className="footer__wrapper">{children}</div>
    </footer>
  );
}
