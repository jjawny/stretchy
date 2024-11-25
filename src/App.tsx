import Hero from "~/Hero";
import ThemeButton from "~/ThemeButton";
import MuiThemeWrapper from "./MuiThemeWrapper";

function App() {
  return (
    <MuiThemeWrapper>
      <main className="relative grid h-screen w-screen items-center justify-center">
        <Hero />
        <ThemeButton />
      </main>
    </MuiThemeWrapper>
  );
}

export default App;
