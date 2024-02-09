export default function getAvatarUrl(avatarName: string) {
  return new URL(`./assets/avatars/${avatarName}`, import.meta.url).href;
}
