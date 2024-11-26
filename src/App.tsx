import Hero from "~/features/hero/Hero";
import MiniHero from "~/features/mini-hero/MiniHero";
import MuiThemeWrapper from "~/features/theme/components/MuiThemeWrapper";
import ThemeButton from "~/features/theme/components/ThemeButton";

function App() {
  return (
    <MuiThemeWrapper>
      <main className="relative grid h-screen w-screen items-center justify-center">
        <Hero />
        <MiniHero className="!absolute bottom-10 right-10" />
        <ThemeButton className="absolute right-10 top-10" />
      </main>
    </MuiThemeWrapper>
  );
}

export default App;
