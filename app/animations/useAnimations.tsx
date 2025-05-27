import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/libs/gsap";

export const useAnimations = () => {
  const pathname = usePathname();

  useGSAP(
    () => {
      // Fade in animation
      gsap.utils.toArray("[data-animate]").forEach((el) => {
        const trigger = el as HTMLElement;
        const start =
          trigger.getAttribute("data-animate-start") || "top center";
        const delay = trigger.getAttribute("data-animate-delay") || "0";
        gsap.to(trigger, {
          scrollTrigger: {
            trigger,
            start,
          },
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: "power1.out",
          delay,
        });
      });
    },
    { dependencies: [pathname] }
  );
};
