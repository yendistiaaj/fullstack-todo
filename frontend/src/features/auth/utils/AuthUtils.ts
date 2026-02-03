export function getIsTokenValid(token: string | null): boolean {
  if (!token) return false;
  return token.split(".").length === 3;
}