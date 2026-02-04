# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-02-03

### Added

- **BottomSheet:** Add `stickyHeader` for in-sheet sticky navigation while scrolling.

### Documentation

- **docs:** Document in-sheet sticky headers in API and examples.

## [1.2.0] - 2026-02-02

### Added

- **useVisualViewport:** Add hook for tracking visual viewport and detecting virtual keyboard state ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **Visual regression testing:** Add Lost Pixel integration for UI consistency checks ([b0f51df](https://github.com/OctavianTocan/react-overlay/commit/b0f51df))

### Changed

- **BREAKING: tailwind-merge ^3.0.0:** Updated peer dependency to support Tailwind CSS v4 only ([f4cf723](https://github.com/OctavianTocan/react-overlay/commit/f4cf723))
- **BottomSheet:** Improved layout spacing for better visual consistency ([e6e0f0b](https://github.com/OctavianTocan/react-overlay/commit/e6e0f0b))

### Fixed

- **BottomSheet tests:** Fixed tests to use fake timers for reliable animation testing ([d7eb88c](https://github.com/OctavianTocan/react-overlay/commit/d7eb88c))

### Chores

- **eslint:** Add ESLint configuration with React and TypeScript rules ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **prettier:** Add Prettier configuration for consistent formatting ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **gitignore:** Exclude storybook-static build output from version control ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **vitest:** Add TypeScript declarations for Vitest matchers ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))

### Documentation

- **CLAUDE.md:** Add visual regression check to before committing section ([21d7a4f](https://github.com/OctavianTocan/react-overlay/commit/21d7a4f))

## [1.0.1] - 2026-02-01

### Added

- **scrollbar:** Add custom scrollbar styling with CSS variables and data attribute ([b45c059](https://github.com/OctavianTocan/react-overlay/commit/b45c059))
- **storybook:** Add Storybook for interactive component documentation ([6921b8d](https://github.com/OctavianTocan/react-overlay/commit/6921b8d))

### Documentation

- **readme:** Add scrollbar styling documentation and CSS variable reference ([774ae43](https://github.com/OctavianTocan/react-overlay/commit/774ae43))
- **docs:** Add comprehensive project documentation ([abbcf8a](https://github.com/OctavianTocan/react-overlay/commit/abbcf8a))

### Chores

- **ci:** Add GitHub Actions publish workflow ([74873ac](https://github.com/OctavianTocan/react-overlay/commit/74873ac))

## [1.0.0] - 2026-02-01

### Added

- **BottomSheet** component with snap points, spring animations, and swipe-to-dismiss
- **Modal** component with size presets (sm/md/lg/xl/full) and Motion animations
- **ModalWrapper** low-level component for custom modal styling
- **ModalHeader** component with icon badge and title
- **ModalDescription** component for styled description text
- **DismissButton** component with portal support for overflow clipping
- **useBodyScrollLock** hook with ref-counting for multiple overlays
- **cn** utility function (clsx + tailwind-merge)
- Full TypeScript support with exported types
- Comprehensive README documentation
