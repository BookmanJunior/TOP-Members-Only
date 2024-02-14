import { UserProps } from "../Types";

export type messageProps = {
  _id: string;
  date: Date;
  message: string;
  user: UserProps;
};

export type setMessagesProps = {
  setMessages: (messages: messageProps[]) => void;
};
