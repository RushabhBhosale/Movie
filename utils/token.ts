"use client";
const TOKEN_KEY = "MOVIE";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token }));
}

export function getToken(): string | null {
  const tokenString = localStorage.getItem(TOKEN_KEY);
  if (tokenString) {
    const tokenObj = JSON.parse(tokenString);
    return tokenObj.token;
  }
  return null;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
