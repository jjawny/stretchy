import { useRef } from "react";
import { useGlitchyTextAnimation } from "~/features/hero/useGlitchyTextAnimation";
import { useDynamicFontSize } from "~/shared/useDynamicFontSize";

const Hero: React.FC = () => {
  const first = "JOHNNY";
  const last = "MADIGAN";
  const containerRef = useRef(null);
  const fontSize = useDynamicFontSize(containerRef);
  const { currentText: firstText } = useGlitchyTextAnimation(first, 0.2, true);
  const { currentText: lastText } = useGlitchyTextAnimation(last, 0.1, true);

  return (
    <div ref={containerRef} className="grid h-screen w-screen place-content-center">
      <div className={`flex h-fit flex-col items-center justify-center justify-items-center`}>
        <h1
          className="cursor-default select-none text-center font-syne font-extrabold"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.15)",
            fontSize: `${fontSize}px`,
            transform: "scaleY(2)",
            lineHeight: 0.75,
          }}
        >
          <span className="first-name">{firstText}</span> <span className="last-name">{lastText}</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
