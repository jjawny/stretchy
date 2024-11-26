import { Tooltip } from "@mui/material";
import { ClassValue } from "clsx";
import { NumberSize, Resizable } from "re-resizable";
import { useRef, useState } from "react";
import { IoArrowUndo as ResetIcon } from "react-icons/io5";
import { cn } from "~/shared/classname.utils";
import SimpleButton from "~/shared/SimpleButton";
import { useDynamicFontSize } from "~/shared/useDynamicFontSize";

const DEFAULT_SIZE: NumberSize = { width: 320, height: 200 };

type MiniHeroProps = {
  className?: ClassValue;
};

const MiniHero: React.FC<MiniHeroProps> = (props) => {
  const { className } = props;
  const [size, setSize] = useState<NumberSize>(DEFAULT_SIZE);
  const containerRef = useRef(null);
  const fontSize = useDynamicFontSize(containerRef);

  const handleResize = (e: any, direction: string, ref: HTMLElement, delta: NumberSize) => {
    setSize((prevSize) => ({
      width: prevSize.width + delta.width,
      height: prevSize.height + delta.height,
    }));
  };

  return (
    <Resizable size={size} minWidth={100} minHeight={100} onResizeStop={handleResize} className={cn(className)}>
      <div ref={containerRef} className="relative grid h-full w-full place-content-center rounded-md bg-amber-300">
        <Tooltip title={`Reset position`}>
          <SimpleButton onClickCallback={() => setSize(DEFAULT_SIZE)} className="absolute right-2 top-2 w-fit">
            <ResetIcon />
          </SimpleButton>
        </Tooltip>
        <h3
          className="text-center font-syne text-black"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.15)",
            fontSize: `${fontSize}px`,
            transform: "scaleY(2)",
            lineHeight: 0.75,
          }}
        >
          BIG STRETCH
        </h3>
      </div>
    </Resizable>
  );
};

export default MiniHero;
