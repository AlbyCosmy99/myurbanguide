import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  dependencies?: number[];
}

const ScrollToTop = ({ dependencies = [] }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, ...dependencies]);

  return null;
};

export default ScrollToTop;
