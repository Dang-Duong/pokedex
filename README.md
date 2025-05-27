# Pokédex

## Overview

Pokédex application that provides users a way to search and filter Pokémons. The application features animations, responsive design and search capabilities.

## Tech Stack

This project is built using:

### Framework

NextJS
React
Typescript

### Styling & Animations

GSAP
Tailwind CSS

### Data & API

Axios

## Features

### 🔍 **Search & Filter Functionality**

- Added SearchBar that find the pokémon by name or it ID, combined with Filter that filters all types of pokémon

### 📱 **Interactive Pokémon Cards**

- Pokémon information on a Card with a flip function between front and back side of the card

### 🎨 **Animations**

- Animations on initial load, fade-in and stagger animations.

## Observations

- Found out there are no icons for the type of pokémons, so I had found repository that provides that.
- Adjusted the bg images -> deleted the text that was in the image, because it did not fit with the content.
- Not found in PokéAPI type colors of Pokémon so I had to defined them myself
- No server-side filtering -> it is running on client, because i have not found in the documentation filter on server side
