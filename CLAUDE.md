# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start development server on port 5173 with host enabled
- `pnpm build` - Build production bundle (runs TypeScript check first)
- `pnpm lint` - Run ESLint code quality checks
- `pnpm preview` - Preview production build locally

### Package Management
This project uses `pnpm` as the package manager (evidenced by pnpm-lock.yaml).

## Architecture Overview

### Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with PWA plugin
- **Routing**: React Router DOM v7 with file-based structure
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context providers for UI state
- **HTTP Client**: Axios with interceptors for logging and error handling
- **PWA**: Configured with service worker and manifest

### Project Structure

#### Core Application
- `src/main.tsx` - Application entry point with AppProvider wrapper
- `src/App.tsx` - Root component with mobile-first layout (max-width: md)
- `src/routes/router.tsx` - Centralized routing configuration

#### Feature Domains
The application is organized around 5 main feature domains:
- **onboarding** - User registration and profile setup flow
- **feed** - Social feed functionality with posts and interactions
- **chatting** - Real-time messaging and coffee chat scheduling
- **recruiting** - Job recruitment and announcement system
- **profile** - User profiles, cards, and settings

#### State Management
- `src/contexts/appContext.tsx` - Root provider that wraps multiple context providers
- Context providers: BottomSheet, Modal, ProfileImgModal, CoffeeChat
- No Redux - uses React Context for state management

#### API Layer
- `src/apis/apiClient.ts` - Configured Axios instance with interceptors
- Base URL from `VITE_API_BASE_URL` environment variable
- Credentials enabled, 10s timeout
- Interceptors for logging and error handling in `src/apis/middlewares/`

#### Component Organization
- `src/components/common/` - Shared UI components
- `src/components/layouts/` - Layout components (BottomNav, etc.)
- `src/components/[feature]/` - Feature-specific components
- `src/components/skeletons/` - Loading skeleton components
- `src/components/ui/` - Base UI components (Modal, BottomSheet)

#### Styling System
- Custom Tailwind configuration with Korean design system
- Custom color palette (ct-main-blue, ct-gray, etc.)
- Custom typography scale (h1, h2, sub1-4, body1-3)
- Pretendard font family
- Mobile-first responsive design

### Key Technical Patterns

#### Mobile-First Design
- Max width container (max-w-md mx-auto) in App.tsx
- Safe area padding (pt-safe, pb-safe)
- Bottom navigation fixed at bottom with safe area support

#### Asset Management
- Static assets in `public/assets/` organized by feature
- SVG icons for UI elements
- Feature-specific asset directories

#### Data Flow
- Mock data in `src/mocks/` for development
- Type definitions in `src/types/` organized by feature
- Utility functions in `src/utils/` for date handling and formatting

### Development Notes

#### Environment Setup
- Uses Vite environment variables (VITE_* prefix)
- PWA configuration with auto-update and offline support
- TypeScript strict mode enabled

#### Code Quality
- ESLint with React hooks and refresh plugins
- TypeScript ESLint integration
- React 19 with latest hooks patterns

#### Testing & Validation
- Zod for schema validation
- React Hook Form for form handling
- No test framework currently configured

This is a mobile-focused social/professional networking PWA with onboarding, feed, chat, and recruitment features.