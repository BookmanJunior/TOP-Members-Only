import LogOut from "./LogOut";

export default function Nav({ user }: { user: { avatar: string } }) {
  const avatarSrc = `../../public/avatars/${user.avatar}.svg`;
  return (
    <nav className="nav">
      <div className="nav__user">
        <img src={avatarSrc} alt="user avatar" className="avatar__nav" />
        <p className="nav__username">{user.username}</p>
      </div>
      <LogOut />
    </nav>
  );
}
