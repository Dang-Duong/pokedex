import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/libs/gsap";

export const useAnimations = (modalState?: boolean) => {
  const pathname = usePathname();

  useGSAP(
    () => {
      // Fade in animation
      gsap.utils
        .toArray(
          "[data-animate]:not([data-animate-stagger-container] [data-animate]):not([data-animate='modal-backdrop']):not([data-animate='modal-content'])"
        )
        .forEach((el) => {
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

  // Modal animation trigger
  useGSAP(
    () => {
      if (modalState) {
        animateModalOpen();
      }
    },
    { dependencies: [modalState] }
  );

  const animateModalClose = (onComplete: () => void) => {
    const modalElements = gsap.utils.toArray(
      '[data-animate="modal-backdrop"], [data-animate="modal-content"]'
    ) as HTMLElement[];

    if (modalElements.length === 0) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.utils
          .toArray(
            '[data-animate="modal-backdrop"], [data-animate="modal-content"]'
          )
          .forEach((el) => {
            const element = el as HTMLElement;
            element.dataset.animated = "";
          });
        onComplete();
      },
    });

    // Animate backdrop and content elements
    gsap.utils.toArray('[data-animate="modal-content"]').forEach((content) => {
      const contentEl = content as HTMLElement;
      tl.to(
        contentEl,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0
      );
    });

    gsap.utils
      .toArray('[data-animate="modal-backdrop"]')
      .forEach((backdrop) => {
        const backdropEl = backdrop as HTMLElement;
        tl.to(
          backdropEl,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      });
  };

  const animateModalOpen = () => {
    gsap.utils
      .toArray('[data-animate="modal-backdrop"]')
      .forEach((backdrop, index) => {
        const backdropEl = backdrop as HTMLElement;
        const contentEl = gsap.utils.toArray('[data-animate="modal-content"]')[
          index
        ] as HTMLElement;

        if (backdropEl && contentEl && !backdropEl.dataset.animated) {
          backdropEl.dataset.animated = "true";
          contentEl.dataset.animated = "true";

          gsap.set(backdropEl, { opacity: 0 });
          gsap.set(contentEl, { scale: 0.8, opacity: 0 });

          const tl = gsap.timeline();
          tl.to(
            backdropEl,
            {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0
          ).to(
            contentEl,
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
            },
            0.1
          );
        }
      });
  };

  return {
    animateModalClose,
    animateModalOpen,
  };
};
