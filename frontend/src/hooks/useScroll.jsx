import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
export default scroll;