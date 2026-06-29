import React from "react";
import Link from "next/link";

interface ProjectButtonProps {
  /** Visible label. */
  children: React.ReactNode;
  /** Render as a Next.js Link when provided… */
  href?: string;
  /** …otherwise as a <button> with this handler. */
  onClick?: () => void;
  /** Trailing icon — defaults to an arrow that slides right on hover. */
  icon?: React.ReactNode;
  /** Extra classes (padding overrides, pointer-events, etc.). */
  className?: string;
  ariaLabel?: string;
}

/**
 * Shared CTA button for the /projects area — solid brand yellow (on-brand, no
 * gradient) with a modern, smooth hover: a small lift, a deepening shadow, a
 * subtle brighten, and the trailing arrow sliding. Keyboard focus + reduced
 * motion handled. Use across project CTAs for one consistent standard.
 */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-yellowcustom px-8 py-3.5 font-semibold text-primary " +
  "shadow-lg shadow-yellowcustom/30 transition-all duration-300 ease-out " +
  "hover:-translate-y-0.5 hover:bg-[#ffc24d] hover:shadow-xl hover:shadow-yellowcustom/40 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary " +
  "active:translate-y-0 active:scale-95 " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const DefaultArrow = (
  <span
    aria-hidden
    className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
  >
    →
  </span>
);

export const ProjectButton: React.FC<ProjectButtonProps> = ({
  children,
  href,
  onClick,
  icon = DefaultArrow,
  className = "",
  ariaLabel,
}) => {
  const cls = `${base} ${className}`.trim();
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

export default ProjectButton;
