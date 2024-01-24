import blue from "../../public/avatars/blue.svg";
import orange from "../../public/avatars/orange.svg";
import gray from "../../public/avatars/gray.svg";
import green from "../../public/avatars/green.svg";
import red from "../../public/avatars/red.svg";
import pink from "../../public/avatars/pink.svg";
import brown from "../../public/avatars/brown.svg";
import lime from "../../public/avatars/lime.svg";

const avatars = [
  { src: blue, value: "blue" },
  { src: orange, value: "orange" },
  { src: gray, value: "gray" },
  { src: green, value: "green" },
  { src: red, value: "red" },
  { src: pink, value: "pink" },
  { src: brown, value: "brown" },
  { src: lime, value: "lime" },
];

export default function AvatarPicker({ handleCredentialsChange }) {
  return (
    <section className="avatar-picker">
      <p className="title__avatar-picker">Choose Avatar: </p>
      <div role="radiogroup" className="avatars-wrapper">
        {avatars.map((avatar) => (
          <Avatar
            key={avatar.value}
            value={avatar.value}
            src={avatar.src}
            handleCredentialsChange={handleCredentialsChange}
          />
        ))}
      </div>
    </section>
  );
}

function Avatar({ value, src, handleCredentialsChange }) {
  return (
    <label
      htmlFor={`avatar__${value}`}
      className={`avatar__container avatar__container--${value}`}
    >
      <img src={src} alt={`${value} avatar`} />
      <input
        type="radio"
        name="avatar"
        id={`avatar__${value}`}
        className={`avatar__btn`}
        value={value}
        onChange={(e) => handleCredentialsChange(e, "avatar")}
      />
    </label>
  );
}
