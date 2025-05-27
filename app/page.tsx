import { Background } from "./components/background/Background";
import { Header } from "./components/header/Header";
import AnimationProvider from "./providers/AnimationProvider";
import { PokemonApp } from "./components/PokemonApp";

export default function Home() {
  return (
    <AnimationProvider>
      <Background />
      <Header />
      <PokemonApp />
    </AnimationProvider>
  );
}
