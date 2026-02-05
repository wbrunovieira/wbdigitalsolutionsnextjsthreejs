/**
 * ContentPanel - Floating Html overlays in 3D space
 * Three modes: library, video, quiz — each shows a real interface
 */

import { Html } from '@react-three/drei';
import { COLORS } from '../../constants';

type OverlayType = 'library' | 'video' | 'quiz';

interface OverlayTranslations {
  close: string;
  library: {
    search: string;
    categories: string[];
    articles: { title: string; category: string; time: string }[];
    viewAll: string;
  };
  video: {
    title: string;
    subtitle: string;
    playlist: { title: string; duration: string }[];
    play: string;
  };
  quiz: {
    title: string;
    progress: string;
    question: string;
    options: string[];
    submit: string;
    score: string;
    timer: string;
  };
}

interface ContentPanelProps {
  type: OverlayType;
  position: [number, number, number];
  onClose: () => void;
  translations: OverlayTranslations;
}

// Shared styles
const panelBase: React.CSSProperties = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  color: '#fff',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  animation: 'fadeInScale 0.35s ease-out',
  pointerEvents: 'auto',
};

const closeBtn: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  lineHeight: 1,
};

// ===== LIBRARY OVERLAY =====
function LibraryOverlay({ t, onClose }: { t: OverlayTranslations['library']; onClose: () => void }) {
  const categoryColors = [COLORS.purple, COLORS.yellow, COLORS.blue, '#e74c8b'];

  return (
    <div style={{
      ...panelBase,
      width: '380px',
      background: 'rgba(10, 10, 28, 0.94)',
      border: `1px solid ${COLORS.purple}50`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 20px ${COLORS.purple}30`,
      padding: '20px',
      position: 'relative',
    }}>
      <button onClick={onClose} style={closeBtn}>×</button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span style={{ fontSize: '16px', fontWeight: 700 }}>Content Library</span>
      </div>

      {/* Search bar */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '10px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{t.search}</span>
      </div>

      {/* Article cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        {t.articles.map((article, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '12px',
            padding: '12px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            alignItems: 'center',
          }}>
            {/* Thumbnail placeholder */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${categoryColors[i]}40, ${categoryColors[i]}15)`,
              border: `1px solid ${categoryColors[i]}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={categoryColors[i]} strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{article.title}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: categoryColors[i],
                  background: `${categoryColors[i]}18`,
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}>{article.category}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{article.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {t.categories.map((cat, i) => (
          <span key={i} style={{
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${categoryColors[i % categoryColors.length]}40`,
            color: categoryColors[i % categoryColors.length],
            background: `${categoryColors[i % categoryColors.length]}10`,
          }}>{cat}</span>
        ))}
      </div>

      {/* View all */}
      <div style={{
        textAlign: 'center',
        fontSize: '13px',
        color: COLORS.purple,
        fontWeight: 600,
        cursor: 'pointer',
      }}>{t.viewAll}</div>
    </div>
  );
}

// ===== VIDEO OVERLAY =====
function VideoOverlay({ t, onClose }: { t: OverlayTranslations['video']; onClose: () => void }) {
  return (
    <div style={{
      ...panelBase,
      width: '420px',
      background: 'rgba(10, 10, 28, 0.94)',
      border: `1px solid ${COLORS.yellow}40`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 20px ${COLORS.yellow}20`,
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <button onClick={onClose} style={{ ...closeBtn, top: '8px', right: '8px', zIndex: 2 }}>×</button>

      {/* Video area */}
      <div style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Play button */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `${COLORS.yellow}20`,
          border: `2px solid ${COLORS.yellow}80`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={COLORS.yellow}>
            <polygon points="8 5 20 12 8 19 8 5" />
          </svg>
        </div>
        {/* Video placeholder text */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
        }}>VIDEO PLACEHOLDER</div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 16px', marginTop: '8px' }}>
        <div style={{
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '35%',
            height: '100%',
            background: COLORS.yellow,
            borderRadius: '2px',
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.35)',
          marginTop: '4px',
        }}>
          <span>4:23</span>
          <span>12:30</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: '10px 16px 6px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700 }}>{t.title}</div>
        <div style={{ fontSize: '12px', color: COLORS.yellow, marginTop: '2px' }}>{t.subtitle}</div>
      </div>

      {/* Playlist */}
      <div style={{ padding: '4px 16px 16px' }}>
        {t.playlist.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            borderRadius: '8px',
            background: i === 0 ? `${COLORS.yellow}12` : 'transparent',
            border: i === 0 ? `1px solid ${COLORS.yellow}25` : '1px solid transparent',
            marginBottom: '2px',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: i === 0 ? COLORS.yellow : 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {i === 0 ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#000"><polygon points="8 5 20 12 8 19" /></svg>
              ) : (
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{i + 1}</span>
              )}
            </div>
            <div style={{ flex: 1, fontSize: '12px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)' }}>
              {item.title}
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{item.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== QUIZ OVERLAY =====
function QuizOverlay({ t, onClose }: { t: OverlayTranslations['quiz']; onClose: () => void }) {
  return (
    <div style={{
      ...panelBase,
      width: '380px',
      background: 'rgba(10, 10, 28, 0.94)',
      border: `1px solid ${COLORS.blue}40`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 20px ${COLORS.blue}20`,
      padding: '20px',
      position: 'relative',
    }}>
      <button onClick={onClose} style={closeBtn}>×</button>

      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <span style={{ fontSize: '16px', fontWeight: 700 }}>{t.title}</span>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: COLORS.blue }}>{t.progress}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{t.timer}: 4:30</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: COLORS.blue, borderRadius: '2px' }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.5,
        marginBottom: '16px',
        padding: '14px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '10px',
        borderLeft: `3px solid ${COLORS.blue}`,
      }}>
        {t.question}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {t.options.map((option, i) => {
          const isSelected = i === 0;
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: isSelected ? `${COLORS.blue}15` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isSelected ? `${COLORS.blue}50` : 'rgba(255,255,255,0.06)'}`,
              cursor: 'pointer',
            }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: `2px solid ${isSelected ? COLORS.blue : 'rgba(255,255,255,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isSelected && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.blue }} />
                )}
              </div>
              <span style={{ fontSize: '13px', color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)' }}>{option}</span>
            </div>
          );
        })}
      </div>

      {/* Submit + Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          padding: '10px 24px',
          borderRadius: '10px',
          background: COLORS.blue,
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
        }}>{t.submit}</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{t.score}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: COLORS.blue }}>80%</div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export function ContentPanel({ type, position, onClose, translations }: ContentPanelProps) {
  return (
    <Html
      center
      position={position}
      style={{ pointerEvents: 'none' }}
    >
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      {type === 'library' && <LibraryOverlay t={translations.library} onClose={onClose} />}
      {type === 'video' && <VideoOverlay t={translations.video} onClose={onClose} />}
      {type === 'quiz' && <QuizOverlay t={translations.quiz} onClose={onClose} />}
    </Html>
  );
}

export default ContentPanel;
