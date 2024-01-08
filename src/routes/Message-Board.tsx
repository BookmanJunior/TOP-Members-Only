export default function MessageBoard() {
  const mockMessages = [
    {
      message: "Test MEssage",
      user: "Suna",
      date: new Date(),
    },
    {
      message: "Test MEssage2",
      user: "Tuna",
      date: new Date(),
    },
  ];

  return (
    <div>
      {mockMessages.map((message) => {
        return (
          <div key={message.date.toDateString()}>
            <div>{message.user}</div>
            <div>{message.message}</div>
            <div>{message.date.toDateString()}</div>
          </div>
        );
      })}
    </div>
  );
}
