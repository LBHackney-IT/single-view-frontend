import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);
  const { action } = useHistory();

  useEffect(() => {
    if (action !== "POP" && pathname !== prevPathname.current) {
      window.scrollTo(0, 0);
    }
    prevPathname.current = pathname;
  }, [pathname, action]);

  return null;
};
