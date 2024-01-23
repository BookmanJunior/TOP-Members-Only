import LogOut from "./LogOut";

export default function Nav({ user }: { user: { avatar: string } }) {
  const avatarSrc = `../../public/avatars/${user.avatar}.svg`;
  return (
    <nav className="nav">
      <img src={avatarSrc} alt="user avatar" className="avatar__nav" />
      <LogOut />
    </nav>
  );
}
