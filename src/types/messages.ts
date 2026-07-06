// types/messages.ts

// The canonical message-bundle shape is the English locale file: every page
// reads keys that must exist there, so deriving the type from en.json gives
// real key-level type-safety instead of an `any` index signature.
export type MessageFormat = typeof import('../locales/en.json');
