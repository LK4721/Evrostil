import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetScrollPosition } from "../utils/scrollToTop";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    resetScrollPosition(false);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
