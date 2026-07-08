import { Html, useProgress } from '@react-three/drei';
import styles from './Loader.module.css';

/**
 * Branded 3D loading state: amber ring + rounded percentage. The old version
 * relied on a `.canvas-loader` global class that no longer exists, which left a
 * naked "31.48%" floating in the scene.
 */
const Loader: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{Math.round(progress)}%</p>
    </Html>
  );
};

export default Loader;
