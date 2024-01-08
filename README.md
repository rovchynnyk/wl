# Worklife

This project is a single-page application (SPA) developed as part of a Frontend Technical Assignment. It uses Vue 3 and Vue Query from TanStack with TypeScript. The application utilizes the Rijksmuseum open API to display a listing of artworks, a detailed view for each artwork, and incorporates a "Favourites" feature.

## Features

- Pagination: Navigate through large lists with ease using load more button.
- Search: Quickly find artworks with the search functionality.
- Artwork Details: Clicking on an artwork opens a detailed view with more information.
- Responsive Design: The application is fully responsive, supporting desktop, tablet, and mobile views.
- Performance: The application is built with performance in mind, and uses Vue Query to cache data and minimize network requests.
- Favourites Feature: Users can add artworks to their favourites (stored in localStorage).


## Built With
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework.
- [Vue Query](https://tanstack.com/query/v5) - A powerful data synchronization library for Vue.
- [TypeScript](https://www.typescriptlang.org/) - An open-source language which builds on JavaScript by adding static type definitions.
- [Vite](https://vitejs.dev/) - A no-bundle, lightning-fast web development server.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed.

### Clone the Repository

```sh
git clone https://github.com/rovchynnyk/wl.git

cd wl
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
