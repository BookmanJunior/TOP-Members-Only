import { ReactNode } from "react";

type InputLabelProps = {
  name: string;
  title?: string;
  children?: ReactNode | ReactNode[];
};

type InputProps = InputLabelProps & React.InputHTMLAttributes<HTMLInputElement>;

type FormButtonProps = {
  loading: boolean;
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function UsernameInput({
  name,
  title = "",
  children,
  ...props
}: InputProps) {
  return (
    <InputLabel name={name} title={title}>
      <input type="text" name={name} id={name} {...props} />
      {children}
    </InputLabel>
  );
}

export function PasswordInput({
  name,
  title = "",
  children,
  ...props
}: InputProps) {
  return (
    <InputLabel name={name} title={title}>
      <input type="password" name={name} id={name} {...props} />
      {children}
    </InputLabel>
  );
}

export function FormButton({
  className,
  loading,
  children,
  ...props
}: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className={`${className} ${loading ? "loading" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

function InputLabel({ name, title = "", children }: InputLabelProps) {
  return (
    <label htmlFor={name}>
      <span className="label-title">{title ? title : name}</span>
      {children}
    </label>
  );
}
