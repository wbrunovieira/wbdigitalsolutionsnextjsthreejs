/**
 * First-paint skeleton for the DEV CV: dark graphite cover with the page's
 * own vocabulary ($ prompt + blinking amber cursor + shimmer lockup bars).
 * It ships in the SSR HTML (so the WB purple body never shows) and an
 * inline script hides it as soon as fonts settle, NOT waiting for React
 * hydration; this keeps the reveal fast and the Lighthouse LCP impact low.
 * Decorative only: aria-hidden, no text (language-neutral by design).
 */

import React, { useEffect, useState } from "react";
import styles from "./DevSkeleton.module.css";

/* Pre-hydration fast path only; the React effect below is the reliable
   hide (a hydration remount would otherwise drop the attribute and leave
   the skeleton stuck). */
const HIDE_SCRIPT = `(function(){var el=document.getElementById("dev-skeleton");if(!el)return;
var done=function(){el.setAttribute("data-done","true")};
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){requestAnimationFrame(done)});
setTimeout(done,1500);})();`;

const BARS = [
  { width: "34%", height: 14 },
  { width: "72%", height: 42 },
  { width: "58%", height: 42 },
  { width: "44%", height: 14 },
];

const DevSkeleton: React.FC = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    const finish = () => alive && setDone(true);
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => requestAnimationFrame(finish));
    const cap = setTimeout(finish, 1500);
    return () => {
      alive = false;
      clearTimeout(cap);
    };
  }, []);

  return (
    <>
      <div id="dev-skeleton" aria-hidden="true" className={styles.overlay} data-done={done || undefined}>
        <div className={styles.prompt}>
          <span style={{ color: "#e0912f" }}>$</span>
          <span className={styles.cursor} />
        </div>
        {BARS.map((b, i) => (
          <div key={i} className={styles.bar} style={{ width: b.width, height: b.height }} />
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE_SCRIPT }} />
    </>
  );
};

export default DevSkeleton;
