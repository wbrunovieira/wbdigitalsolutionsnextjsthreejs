'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  /** Rendered instead of the 3D canvas when it fails (e.g. no WebGL context). */
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches errors thrown by a Three.js / R3F <Canvas> — most importantly
 * "Error creating WebGL context" when the browser runs out of WebGL contexts
 * or has hardware acceleration disabled.
 *
 * Without this, such an error crashes the React tree, which in dev triggers a
 * Fast Refresh full reload → crash → reload loop (and leaks more contexts).
 * Here we render a graceful fallback instead.
 */
class CanvasErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
       
      console.warn('[CanvasErrorBoundary] 3D canvas error suppressed:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
