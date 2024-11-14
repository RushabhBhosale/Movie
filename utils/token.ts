// utils/token.ts

const TOKEN_KEY = "MOVIE";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Save the token to localStorage (only in the browser)
export function saveToken(token: string) {
  if (isBrowser) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

// Retrieve the token from localStorage (only in the browser)
export function getToken(): string | null {
  if (isBrowser) {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

// Remove the token from localStorage (only in the browser)
export function removeToken() {
  if (isBrowser) {
    localStorage.removeItem(TOKEN_KEY);
  }
}
