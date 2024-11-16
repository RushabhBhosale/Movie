export const clearTokenFromCookies = () => {
  document.cookie = "token=; max-age=0; path=/; secure; SameSite=Strict;";
};

export const getTokenFromServer = async () => {
  const response = await fetch("api/token");
  const data = await response.json();
  return data.token || null;
};
