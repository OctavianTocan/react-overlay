# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-02

### Added

- **useVisualViewport:** Add hook for tracking visual viewport and detecting virtual keyboard state ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))

### Chores

- **eslint:** Add ESLint configuration with React and TypeScript rules ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **prettier:** Add Prettier configuration for consistent formatting ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **gitignore:** Exclude storybook-static build output from version control ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))
- **vitest:** Add TypeScript declarations for Vitest matchers ([dd7b7b6](https://github.com/OctavianTocan/react-overlay/commit/dd7b7b6))

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
