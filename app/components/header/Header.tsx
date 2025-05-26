import Image from "next/image";

export const Header = () => {
  return (
    <header
      data-animate
      data-animate-delay="1"
      className="flex flex-col items-center h-full justify-center translate-y-[150px] lg:translate-y-[200px] mt-10 lg:mt-16"
    >
      <Image
        src="/images/logo.svg"
        alt="Pokedex"
        width={100}
        height={100}
        className="w-1/2 lg:w-1/3"
      />
      <h1 className="text-xl lg:text-2xl font-thin font-pokemon-solid mt-5">
        Gotta Catch &apos;Em All!
      </h1>
    </header>
  );
};
