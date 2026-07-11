'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

/** The real WB emblem (three overlapping circles) lifted from logo-white.svg,
 *  in the logo's native coords centred near (52.8, 44.77). */
const EMBLEM_D =
  'M55.19 44.7727C55.19 48.0328 54.321 51.0879 52.8042 53.7145C51.2875 51.0879 50.4185 48.0328 50.4185 44.7727C50.4185 41.5126 51.2875 38.4576 52.8042 35.831C54.321 38.4576 55.19 41.5126 55.19 44.7727ZM44.9014 28.6C38.8309 31.4027 34.6128 37.5902 34.6128 44.7727C34.6128 51.9553 38.8309 58.1427 44.9014 60.9454C42.676 61.9729 40.2017 62.5455 37.595 62.5455C27.8775 62.5455 20 54.5883 20 44.7727C20 34.9571 27.8775 27 37.595 27C40.2017 27 42.676 27.5726 44.9014 28.6ZM60.1106 28.8893C57.0606 30.4407 54.5186 32.8621 52.8042 35.831C50.9793 32.6707 48.2166 30.1306 44.9014 28.6C47.1268 27.5726 49.6011 27 52.2078 27C55.0498 27 57.7344 27.6806 60.1106 28.8893ZM60.1106 28.8893C62.4869 27.6806 65.1715 27 68.0135 27C77.7309 27 85.6085 34.9571 85.6085 44.7727C85.6085 54.5883 77.7309 62.5455 68.0135 62.5455C65.1715 62.5455 62.4869 61.8648 60.1106 60.6562C65.8592 57.7322 69.8028 51.7176 69.8028 44.7727C69.8028 37.8278 65.8592 31.8133 60.1106 28.8893ZM60.1106 60.6562C57.0606 59.1048 54.5186 56.6833 52.8042 53.7145C50.9793 56.8748 48.2166 59.4148 44.9014 60.9454C47.1268 61.9729 49.6011 62.5455 52.2078 62.5455C55.0498 62.5455 57.7344 61.8648 60.1106 60.6562Z';

/** The three overlapping brand circles, as construction-ring centres. */
const RINGS = [37.595, 52.804, 68.0135];
const WORDMARK = 'WB DIGITAL SOLUTIONS';

/**
 * Branded intro shown on the first load of a session. A layered brand ident that
 * "constructs" the real WB logo: faint construction rings sweep in and converge
 * onto the emblem's three overlapping circles, then dissolve as the solid brand
 * emblem crystallises with a glow, wrapped in a slow orbital system and an
 * ambient aura, with the wordmark revealing letter by letter (see the CSS
 * module). Fades out once the window has loaded (with a small minimum on-screen
 * time so it never just flickers).
 */
const Preloader = () => {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('wb-preloaded')) {
      setHidden(true);
      return;
    }

    const MIN_MS = 900;
    const start = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      fadeTimer = setTimeout(() => {
        setDone(true);
        try { sessionStorage.setItem('wb-preloaded', '1'); } catch { /* ignore */ }
        hideTimer = setTimeout(() => setHidden(true), 700); // after the fade
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0826] transition-opacity duration-700 ease-out ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <svg
        className={styles.stage}
        viewBox="-17.2 -25.23 140 140"
        aria-hidden="true"
        focusable="false"
        role="presentation"
      >
        <defs>
          <radialGradient id="wb-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#792990" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#792990" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#792990" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient aura */}
        <circle className={styles.aura} cx="52.8" cy="44.77" r="62" fill="url(#wb-aura)" />

        {/* Orbital system: dashed ring + two nodes, slow revolve */}
        <g className={styles.orbit}>
          <circle className={styles.track} cx="52.8" cy="44.77" r="50" />
          <circle className={styles.node} cx="52.8" cy="-5.23" r="1.9" />
          <circle className={styles.nodeY} cx="5.8" cy="27.7" r="2.4" />
        </g>

        {/* Inner indeterminate arc, opposite spin — the "loading" tell */}
        <circle
          className={styles.loader}
          cx="52.8" cy="44.77" r="42"
          pathLength="100" strokeDasharray="34 66"
        />

        {/* Construction rings converge onto the emblem's three circles */}
        {RINGS.map((cx, i) => (
          <circle
            key={cx}
            className={`${styles.carc} ${styles[`c${i + 1}` as 'c1' | 'c2' | 'c3']}`}
            cx={cx} cy="44.77" r="17.75"
            pathLength="100" strokeDasharray="74 26"
          />
        ))}

        {/* Hero: the real brand emblem crystallises with a breathing glow */}
        <g className={styles.emblemGlow}>
          <path className={styles.emblem} d={EMBLEM_D} />
        </g>

        {/* Twinkle sparks */}
        <circle className={`${styles.spark} ${styles.s1}`} cx="26" cy="24" r="1.5" />
        <circle className={`${styles.spark} ${styles.s2}`} cx="80" cy="22" r="1.5" />
        <circle className={`${styles.spark} ${styles.s3}`} cx="70" cy="70" r="1.5" />
      </svg>

      {/* Wordmark: letters rise + fade in, staggered */}
      <div className={styles.wordmark} aria-hidden="true">
        {WORDMARK.split('').map((ch, i) =>
          ch === ' ' ? (
            <span key={i} className={styles.space} />
          ) : (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${1.35 + i * 0.05}s` }}
            >
              {ch}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Preloader;
