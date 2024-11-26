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
    <Resizable size={mappedSize} minWidth={100} minHeight={100} onResizeStop={handleResize} className={cn(className)}>
      <div ref={containerRef} className="relative grid h-full w-full place-content-center rounded-md bg-amber-300">
        <Tooltip title={`Reset position`}>
          <SimpleButton onClickCallback={() => setSizeDirectly(DEFAULT_SIZE)} className="absolute right-2 top-2 w-fit">
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
