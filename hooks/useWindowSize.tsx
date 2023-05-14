import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | null;
  isTablet: boolean | null;
}

export default function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
    isMobile: null,
    isTablet: null
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: (window.innerWidth >= 280 && window.innerWidth <= 820) || (window.outerWidth >= 280 && window.outerWidth <= 820),
        isTablet: (window.innerWidth >= 768 && window.innerWidth <= 820) || (window.outerWidth >= 768 && window.outerWidth <= 820)
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}