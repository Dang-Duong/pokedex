import Image from "next/image";

export const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/bg_desktop.jpg"
        alt="background"
        fill
        className="hidden lg:block object-cover"
      />
      <Image
        src="/images/bg_mobile.jpg"
        alt="background"
        fill
        className="lg:hidden object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f9da49]/20 to-[#f9da49]"></div>
    </div>
  );
};
