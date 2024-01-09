import { useLoaderData } from "react-router-dom";

export default function MessageBoard() {
  const messages = useLoaderData();

  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.date + message.user._id}>
            <div>{message.user.username}</div>
            <div>{message.message}</div>
            <div>{message.date}</div>
          </div>
        );
      })}
    </div>
  );
}
