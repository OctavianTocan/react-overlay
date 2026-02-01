# Agent Guidelines

This file provides essential information for agentic coding agents working in this repository.

## Commands

### Development & Build
- `pnpm run build` - Build library with tsup (outputs ESM, CJS, DTS)
- `pnpm run dev` - Watch mode for development
- `pnpm run typecheck` - Run TypeScript type checking
- `pnpm run clean` - Remove dist/ and coverage/ directories

### Testing
- `pnpm run test` - Run all tests with Vitest
- `pnpm run test:watch` - Watch mode for tests
- `pnpm run test:coverage` - Generate coverage report
- **Run single test**: `pnpm vitest run src/__tests__/Modal.test.tsx`

### Quality
- `pnpm run lint` - ESLint check on src/ directory

### Documentation
- `pnpm run storybook` - Start Storybook dev server (port 6006)
- `pnpm run build-storybook` - Build static Storybook

## Code Style

### Imports
- Use ES modules: `import { foo } from 'bar'`
- Type imports: `import type { FooType } from './types'`
- React imports: `import React from 'react'`
- `'use client'` directive at top of client components (Next.js compat)
- Group imports: external deps → internal → types

### Formatting
- 2-space indentation
- Trailing commas in multi-line arrays/objects
- Max ~100 characters per line
- No existing linter configs - follow existing patterns

### TypeScript
- Strict mode enabled (`strict: true`)
- Explicit interfaces for component props: `interface Props { ... }`
- `ReactNode` for children props
- Generics use descriptive names: `<TData, TError>`
- Optional props with `?:` or `| undefined`
- Array types: `Type[]` not `Array<Type>`

### Naming
- Components: PascalCase (`Modal`, `BottomSheet`)
- Functions/hooks: camelCase (`useBodyScrollLock`)
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE (`DISMISS_THRESHOLD_PX`)
- Test files: `{Component}.test.{ts,tsx}`
- Story files: `{Component}.stories.{ts,tsx}`

### Error Handling
- Type guards for runtime checks: `typeof value === 'string'`
- Optional chaining: `foo?.bar?.baz`
- Nullish coalescing: `foo ?? defaultValue`
- Try/catch for async operations

### Components
- Functional components with hooks
- Props destructuring in function signature
- Use `forwardRef` when exposing refs
- `useCallback`/`useMemo` for optimization
- Imperative handles via `useImperativeHandle`
- Portals for overlays: `createPortal(<Child />, document.body)`
- Motion for animations (framer-motion's `motion` package)

### Accessibility
- Semantic HTML elements
- Keyboard navigation support (Enter, Escape, arrows)
- ARIA attributes: `aria-label`, `aria-labelledby`, `aria-describedby`
- `data-testid` for testing
- Focus management: `useRef` + `.focus()`
- Screen reader text with `aria-hidden="true"` for decorative icons

### Testing
- Test library: Vitest + @testing-library/react
- Test files in `src/__tests__/` directory
- `describe` for test suites, `it` for individual tests
- `beforeEach`/`afterEach` for setup/teardown
- Mock `window.matchMedia`, `ResizeObserver` in vitest.setup.ts
- Coverage excludes: tests, stories, index files, types

### File Organization
```
src/
  ├── __tests__/         # Test files
  ├── bottom-sheet/      # Feature modules
  │   ├── BottomSheet.tsx
  │   ├── constants.ts
  │   ├── index.ts      # Exports
  │   ├── types.ts
  │   └── *.stories.tsx
  ├── hooks/            # Custom React hooks
  ├── modal/            # Feature modules
  ├── styles/           # CSS files
  ├── types/            # Shared types
  └── utils/            # Utility functions
```

### CSS/Tailwind
- Use `cn()` utility for class merging (clsx + tailwind-merge)
- Inline styles only for dynamic properties
- `data-ro-scroll` attribute for custom scrollbar styling
- Motion respects `prefers-reduced-motion`

### Common Patterns
- Legacy API support: `isOpen`/`onClose` aliases for `open`/`onDismiss`
- Ref-counting for scroll lock: `useBodyScrollLock` handles concurrent overlays
- Spring animations with cubic-bezier easing: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Safe area insets: `env(safe-area-inset-bottom, 0px)` for mobile

### Documentation
- JSDoc for all public APIs with `@param`, `@returns`, `@example`
- File headers with `@fileoverview` and `@description`
- Examples in JSDoc blocks
- Table exports in main `index.ts` with descriptions

### Peer Dependencies
- React 18/19, react-dom
- motion (animations)
- clsx, tailwind-merge (CSS utilities)
- lucide-react (optional, for icons)

## Before Committing
Run typecheck and tests to ensure code quality:
```bash
pnpm run typecheck
pnpm run test
pnpm run lint
```
