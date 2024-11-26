import { RefObject, useEffect, useState } from "react";
import { debounce } from "~/shared/no-lodash.utils";

const DEBOUCNE_DELAY_MS = 10;

export const useDynamicFontSize = (containerRef: RefObject<HTMLElement> | null, initialSize: number = 10) => {
  const [fontSize, setFontSize] = useState(initialSize);

  useEffect(() => {
    const updateFontSize = () => {
      if (!containerRef?.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      // TODO: allow multipliers as params, or somehow detect font-size height...
      const calculatedFontSize = Math.min(offsetWidth * 0.15, offsetHeight * 0.2);
      setFontSize(calculatedFontSize);
    };

    // 1ST RENDER
    updateFontSize();

    // 👂🏻 LISTEN FOR RESIZE
    const debouncedUpdateFontSize = debounce(updateFontSize, DEBOUCNE_DELAY_MS);

    const resizeObserver = new ResizeObserver(() => {
      debouncedUpdateFontSize();
    });

    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return fontSize;
};
