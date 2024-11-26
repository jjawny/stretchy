import { Tooltip } from "@mui/material";
import { ClassValue } from "clsx";
import { NumberSize, Resizable } from "re-resizable";
import { useRef } from "react";
import { IoArrowUndo as ResetIcon } from "react-icons/io5";
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
  const containerRef = useRef(null);
  const fontSize = useDynamicFontSize(containerRef);
  const { size, handleResize, setSizeDirectly } = useResizeDimensions();

  // Separate tech-specific Resize type from saved type
  const mappedSize: NumberSize = {
    width: size.width,
    height: size.height,
  };

  return (
    <Resizable size={mappedSize} minWidth={100} minHeight={150} onResizeStop={handleResize} className={cn(className)}>
      <div className="flex h-full w-full flex-col rounded-md bg-yellow-300">
        <div className="flex">
          <div className="flex-grow">handle here</div>
          <Tooltip title="Reset my position">
            <SimpleButton onClickCallback={() => setSizeDirectly(DEFAULT_SIZE)} className="w-fit">
              <ResetIcon />
            </SimpleButton>
          </Tooltip>
        </div>
        <div ref={containerRef} className="grid flex-grow place-content-center">
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
        {/* TODO: try out text affect like Glitche/eeaao end credits */}
        <div className="h-20 w-full">
          <img
            src="/cat.png"
            alt="A cat stretching"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </Resizable>
  );
};

export default MiniHero;
