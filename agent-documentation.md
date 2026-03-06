# Design System Agent Documentation

This document describes how to use `@popsure/dirty-swan` to build accessible, responsive, and brand-consistent UIs. It is intended to be read by AI coding agents.

## Utility classes over custom SCSS

Use dirty-swan utility classes inline whenever possible. Only write custom SCSS modules for styling that cannot be achieved with utilities. Examples (non-exhaustive):

- **Spacing (8px increments)**: `mt8`, `p24`, `gap16`
- **Typography**: `p-h1` through `p-h4`, `p-p`, `p-p--small`, `p-a`, `p--serif`
- **Display**: `d-flex`, `d-none`, `d-grid`
- **Flexbox**: `ai-center`, `jc-between`, `fd-column`
- **Text color**: `tc-neutral-900`, `tc-purple-500`, `tc-red-500`
- **Background color**: `bg-neutral-50`, `bg-white`, `bg-purple-100`
- **Border radius**: `br8`, `br-circle`, `br-pill`
- **Box shadow**: `bs-sm`, `bs-md`, `bs-lg`
- **Width**: `w-auto`, `w50`, `w100`
- **Cursor**: `c-pointer`, `c-not-allowed`

## Native components and assets

- Always prefer dirty-swan components (e.g., `Button`, `Card`, `Input`, `CurrencyInput`, `Radio`, `BottomOrRegularModal`, `ComparisonTable`, `FullScreenModal`) over building custom equivalents.
- Import icons from `@popsure/dirty-swan` (e.g., `ChevronRightIcon`, `ArrowRightIcon`, `UserIcon`, `HeartIcon`, `ShieldIcon`) instead of adding custom assets, unless specifically requested.

## Responsive styling

Use dirty-swan SCSS mixins (`@include p-size-mobile`, `@include p-size-tablet`, `@include p-size-desktop`) in module files. Use the `useMediaQuery` hook for JS-based responsive logic.

## Hooks

The library exports hooks for common UI patterns. Examples: `useMediaQuery` for JS-based responsive logic, `useOnClickOutside` to detect clicks outside an element, `useEscapeKey` to handle escape key presses, and `useFocusWithin` to track focus entering or leaving an element. Check the library exports before writing custom hooks or writing complex logic around the UI.

## SCSS variables

Import grid/color variables via `@import '@popsure/dirty-swan/dist/grid'` and `@import '@popsure/dirty-swan/dist/colors'`. Access color tokens as `$ds-neutral-900`, `$ds-purple-300`, etc.
