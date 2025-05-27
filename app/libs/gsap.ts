import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(Draggable);

CustomEase.create("defaultEase", "M0,0 C0.51,-0.01,0,0.99,1,1");

gsap.defaults({
  duration: 1.3,
  ease: "defaultEase",
});

export { gsap, ScrollTrigger, Draggable };
