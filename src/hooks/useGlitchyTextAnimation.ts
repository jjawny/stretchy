import { useCallback, useEffect, useRef, useState } from "react";

export const useGlitchyTextAnimation = (text: string, speed: number = 0.3, isPlayOnRender: boolean = false) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const frameRef = useRef<number | null>(null);
  const [currentText, setCurrentText] = useState(text);

  const startAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      setCurrentText(text);
    }

    let iteration = 0;

    const animate = () => {
      const nextText = text
        .split("")
        .map((letter, idx) => {
          // return the original letters as we iterate
          if (idx < iteration) return text[idx];

          // handle spaces
          if (letter.trim() === "") return " ";

          // the randomized letter
          const randomLetter = letters[Math.floor(Math.random() * letters.length)] ?? "$";
          const isLowerCase = letter === letter.toLowerCase();
          return isLowerCase ? randomLetter.toLocaleLowerCase() : randomLetter.toLocaleUpperCase();
        })
        .join("");

      setCurrentText(nextText);

      if (iteration < text.length) {
        iteration += speed;
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [speed, text]);

  useEffect(() => {
    if (isPlayOnRender) startAnimation();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlayOnRender, startAnimation]);

  return { currentText, startAnimation };
};
