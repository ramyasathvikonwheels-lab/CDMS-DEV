# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React + TypeScript + Vite** web application preconfigured for **Microsoft Power Apps Canvas Apps**. The project uses:
- **React 19** for UI components
- **TypeScript 5.9** for type safety
- **Vite 7.2** as the build tool with Hot Module Replacement (HMR)
- **Power Apps SDK** (`@microsoft/power-apps`) for Canvas App integration
- **ESLint** with TypeScript and React Rules for code quality

The application is designed to be deployed as a Power Apps Canvas App using the Power Apps Vite plugin.

## Commands

All commands are run from the `my-app` directory:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Compile TypeScript (`tsc -b`) and build for production (`vite build`) |
| `npm run lint` | Run ESLint on all TypeScript and TSX files |
| `npm run preview` | Preview the production build locally |

## Architecture

### Directory Structure

```
my-app/
├── src/
│   ├── App.tsx           # Root React component
│   ├── main.tsx          # Entry point, mounts App to DOM
│   ├── App.css           # App styling
│   ├── index.css         # Global styles
│   └── assets/           # Static assets (images, icons)
├── public/               # Static files served as-is
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration with React and Power Apps plugins
├── tsconfig.json         # TypeScript project configuration (references app & node configs)
├── tsconfig.app.json     # TypeScript config for source code
├── tsconfig.node.json    # TypeScript config for build scripts
└── package.json          # Dependencies and scripts
```

### Key Configuration Files

- **vite.config.ts**: Configures Vite with React plugin and the `@microsoft/power-apps-vite` plugin for Power Apps integration
- **tsconfig.app.json**: Target ES2020, module ESNext, strict type checking enabled
- **eslint.config.js**: Flat config using ESLint 9+ with TypeScript, React Hooks, and React Refresh rules

### Component Structure

Currently, the application has a single root component (`App.tsx`) that serves as the main entry point. The component uses React Hooks (useState) for state management. When expanding the application:
- Create reusable components in the `src/` directory
- Follow the pattern of functional components with hooks
- Keep components focused on a single responsibility

## Development Notes

### React HMR
The app is configured with React Refresh via Vite's `@vitejs/plugin-react`. This enables fast module replacement during development—changes to components are reflected immediately without full page reloads.

### Power Apps Integration
The `@microsoft/power-apps-vite` plugin is applied in vite.config.ts. This plugin prepares the application for deployment to Power Apps Canvas Apps. The Power Apps SDK (`@microsoft/power-apps`) is available for Canvas App-specific functionality.

### TypeScript Setup
TypeScript is configured with `skipLibCheck: true` and `noEmit: false` in the build. The build process runs `tsc -b` before Vite to catch type errors before bundling.

### ESLint Rules
The ESLint configuration includes:
- **react-hooks/exhaustive-deps**: Ensures dependency arrays in hooks are complete
- **react-refresh/only-export-components**: Prevents invalid exports when using React Refresh
- TypeScript-aware rules for better type checking during linting

## Getting Started

1. Navigate to the `my-app` directory
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Open the displayed URL in your browser
5. Edit `src/App.tsx` or create new components as needed

## Building for Production

Run `npm run build` to:
1. Type-check all TypeScript code
2. Bundle and optimize the application with Vite
3. Output production-ready files to `dist/`

The build is configured to work with Power Apps Canvas App deployment workflows.
