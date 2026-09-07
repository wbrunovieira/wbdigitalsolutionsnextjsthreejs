import React from 'react';

/** The ✦ bullet list used for slide features and engineering highlights. */
const BulletList: React.FC<{ items: string[]; className?: string; itemClassName?: string }> = ({
  items, className = 'mt-6 space-y-2', itemClassName = 'text-sm text-secondary',
}) => (
  <ul className={className}>
    {items.map((item) => (
      <li key={item} className={`flex items-start gap-3 ${itemClassName}`}>
        <span className="mt-1 text-yellowcustom" aria-hidden>
          ✦
        </span>
        {item}
      </li>
    ))}
  </ul>
);

export default BulletList;
