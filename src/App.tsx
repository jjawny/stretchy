import { useDynamicFontSize } from "~/hooks/useDynamicFontSize";

function App() {
  const fontSize = useDynamicFontSize();

  return (
    <main className="grid h-screen w-screen items-center justify-center">
      <div
        className={`flex h-[10vh] flex-col items-center justify-center justify-items-center`}
      >
        <h1
          className="cursor-default select-none text-center font-syne font-extrabold text-white"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.15)",
            fontSize: `${fontSize}px`,
            transform: "scaleY(2)",
            lineHeight: 0.75,
          }}
        >
          <span className="first-name">JOHNNY</span>{" "}
          <span className="last-name">MADIGAN</span>
        </h1>
      </div>
    </main>
  );
}

export default App;
