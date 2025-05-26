import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: "../public/fonts/Roboto-Regular.woff",
  variable: "--font-roboto",
});

const pokemonSolid = localFont({
  src: "../public/fonts/Pokemon-Solid.woff",
  variable: "--font-pokemon-solid",
});

const pokemonHollow = localFont({
  src: "../public/fonts/Pokemon-Hollow.woff",
  variable: "--font-pokemon-hollow",
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable}
          ${pokemonSolid.variable}
          ${pokemonHollow.variable}
          
        `}
      >
        {children}
      </body>
    </html>
  );
}
