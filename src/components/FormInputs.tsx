import { ReactNode } from "react";

type InputLabelProps = {
  name: string;
  title?: string;
  children?: ReactNode | ReactNode[];
};

export function UsernameInput({ name, title = "", children }: InputLabelProps) {
  return (
    <InputLabel name={name} title={title}>
      <input type="text" name={name} id={name} />
      {children}
    </InputLabel>
  );
}

export function PasswordInput({ name, title = "", children }: InputLabelProps) {
  return (
    <InputLabel name={name} title={title}>
      <input type="password" name={name} id={name} />
      {children}
    </InputLabel>
  );
}

function InputLabel({ name, title = "", children }: InputLabelProps) {
  return (
    <label htmlFor={name}>
      {title ? title : name}
      {children}
    </label>
  );
}
