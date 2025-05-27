import { Background } from "./components/background/Background";
import { Header } from "./components/header/Header";
import AnimationProvider from "./providers/AnimationProvider";

export default function Home() {
  return (
    <AnimationProvider>
      <Background />
      <Header />
    </AnimationProvider>
  );
}
