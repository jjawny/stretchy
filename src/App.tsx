import Hero from "~/features/hero/components/Hero";
import ThemeButton from "~/features/theme/components/ThemeButton";
import MuiThemeWrapper from "./features/theme/components/MuiThemeWrapper";

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
