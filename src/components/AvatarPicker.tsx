import blue from "../assets/avatars/blue.svg";
import orange from "../assets/avatars/orange.svg";
import gray from "../assets/avatars/gray.svg";
import green from "../assets/avatars/green.svg";
import red from "../assets/avatars/red.svg";
import pink from "../assets/avatars/pink.svg";
import brown from "../assets/avatars/brown.svg";
import lime from "../assets/avatars/lime.svg";

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
