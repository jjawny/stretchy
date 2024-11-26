import { Tooltip } from "@mui/material";
import { ClassValue } from "clsx";
import { NumberSize, Resizable } from "re-resizable";
import { useCallback, useMemo, useRef } from "react";
import Draggable from "react-draggable";
import toast from "react-hot-toast";
import { PiResize as ResetIcon } from "react-icons/pi";
import { TfiHandDrag as DragIcon } from "react-icons/tfi";
import { DEFAULT_SIZE } from "~/features/mini-hero/mini-hero.constants";
import { useResizeDimensions } from "~/features/mini-hero/useResizeDimensions";
import { cn } from "~/shared/classname.utils";
import SimpleButton from "~/shared/SimpleButton";
import { useDynamicFontSize } from "~/shared/useDynamicFontSize";

type MiniHeroProps = {
  className?: ClassValue;
};

const MiniHero: React.FC<MiniHeroProps> = (props) => {
  const { className } = props;
  const suppressDraggableConsoleErrorRef = useRef(null); // Known issue, see https://github.com/react-grid-layout/react-draggable/issues/749#issuecomment-2098538949
  const containerRef = useRef(null);
  const fontSize = useDynamicFontSize(containerRef);
  const { size, handleResize, setSizeDirectly } = useResizeDimensions();

  const handleResetSizeClick = useCallback(() => {
    toast.success("Size reset!");
    setSizeDirectly(DEFAULT_SIZE);
  }, [setSizeDirectly]);

  // Separate tech-specific Resize type from saved type
  const mappedSize: NumberSize = {
    width: size.width,
    height: size.height,
  };

  const dragHandlerFragment = () => {
    return (
      <strong className="flex-grow cursor-grab rounded-md border border-solid border-stone-300 bg-stone-100">
        <p className="flex flex-nowrap gap-2 whitespace-nowrap text-xs text-gray-300">
          <DragIcon className="invert" /> Hold to drag...
        </p>
      </strong>
    );
  };

  const textFragment = useMemo(() => {
    return (
      <h3
        className="text-center font-syne text-yellow-600"
        style={{
          textShadow: "0 0 10px rgba(255,255,255,0.15)",
          fontSize: `${fontSize}px`,
          transform: "scaleY(2)",
          lineHeight: 0.75,
        }}
      >
        BIG STRETCH
      </h3>
    );
  }, [fontSize]);

  const resetDimensionsFragment = useMemo(() => {
    return (
      <Tooltip title="Reset my size">
        <SimpleButton onClickCallback={handleResetSizeClick} className="w-fit">
          <ResetIcon />
        </SimpleButton>
      </Tooltip>
    );
  }, [handleResetSizeClick]);

  return (
    // TODO: new hook to save position to LocalStorage
    <Draggable handle="strong" nodeRef={suppressDraggableConsoleErrorRef}>
      <div ref={suppressDraggableConsoleErrorRef}>
        <Resizable
          size={mappedSize}
          minWidth={150}
          minHeight={150}
          onResizeStop={handleResize}
          className={cn(className)}
        >
          <div className="flex h-full w-full flex-col rounded-md bg-yellow-300 p-1">
            <div className="flex gap-1">
              {dragHandlerFragment()}
              {resetDimensionsFragment}
            </div>
            <div ref={containerRef} className="grid flex-grow place-content-center">
              {textFragment}
            </div>
            <div className="flex h-8 w-full select-none flex-nowrap">
              <img
                src="/cat-end.png"
                alt="A cat stretching"
                style={{
                  height: "100%",
                }}
              />
              <img
                src="/cat-middle.png"
                alt="A cat stretching"
                style={{
                  width: "100%",
                  height: "100%",
                  flexGrow: "1",
                }}
              />
              <img
                src="/cat-start.png"
                alt="A cat stretching"
                style={{
                  height: "100%",
                }}
              />
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default MiniHero;
