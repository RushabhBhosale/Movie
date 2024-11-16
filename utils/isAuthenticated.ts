"use client";

import { getToken } from "./token";

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }
  return true;
};
