import LogOut from "./LogOut";
import { UserProps } from "../Types";
import getAvatarUrl from "../avatar-util";

type userProps = {
  user: UserProps;
};

export default function Nav({ user }: userProps) {
  return (
    <nav className="nav">
      <NavUser user={user} />
      <LogOut />
    </nav>
  );
}

function NavUser({ user }: userProps) {
  const avatarSrc = getAvatarUrl(`${user.avatar}.svg`);
  return (
    <div className="nav__user">
      <img src={avatarSrc} alt="user avatar" className="avatar__nav" />
      <p className="nav__username">{user?.username}</p>
    </div>
  );
}
