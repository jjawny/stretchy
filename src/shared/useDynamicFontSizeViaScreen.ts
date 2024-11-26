import { useEffect, useState } from "react";

/**
 * The ORIGINAL idea based on view width/height
 * Keep for learning
 * @param initialSize the initial size (to help w FOUC)
 * @returns the font-size in respect to the user's screen dimensions
 */
export const useDynamicFontSize = (initialSize = 33) => {
  const [fontSize, setFontSize] = useState(initialSize);

  useEffect(() => {
    const updateFontSize = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      setFontSize(Math.min(vh * 28, vw * 11));
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return fontSize;
};
