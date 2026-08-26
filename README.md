# React + Vite

## Contact form

The contact form sends mail through the server-side API in `server.mjs`. Copy the values from `.env.example` into the local `.env` file and set your Gmail address, Gmail app password, and destination address. Do not commit `.env`.

Install dependencies and start the frontend plus API together:

```bash
npm install
npm run dev
```

The Vite frontend runs on `http://localhost:5173` and proxies `/api/contact` to the mail API on port `3001`. For production, build the frontend with `npm run build` and run the API with `npm start`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
