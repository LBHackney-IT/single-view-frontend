import Cookies from "js-cookie";

export const getToken = (): string | undefined => {
  return Cookies.get("hackneyToken");
};
