import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface Category {
  label: string;
  color: string;
  amount: string;
  /** Annual usage in gallons, used to position the bar on the log scale. */
  value: number;
  multiplier: string | null; // null for the baseline row
  multiplierColor: string;
  icon: ReactNode;
}

function IconServer() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="3" width="10" height="14" rx="1.5" stroke="#0f2b3d" strokeWidth="1.4" />
      <path d="M5 8h10M5 13h10" stroke="#0f2b3d" strokeWidth="1.2" />
      <circle cx="12.5" cy="5.5" r="0.8" fill="#1a6ea8" />
      <circle cx="12.5" cy="10.5" r="0.8" fill="#1a6ea8" />
      <circle cx="12.5" cy="15.5" r="0.8" fill="#1a6ea8" />
    </svg>
  );
}

function IconGolf() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 17h12" stroke="#0f2b3d" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 17V4" stroke="#0f2b3d" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 4l6 2.4L7 8.8V4Z" fill="#1a6ea8" />
      <circle cx="13.5" cy="15.3" r="1.3" fill="#0f2b3d" />
    </svg>
  );
}

function IconHanger() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3a1.4 1.4 0 1 1 0 2.8" stroke="#0f2b3d" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 5.8 3.3 10.3c-.7.5-.3 1.6.5 1.6h12.4c.8 0 1.2-1.1.5-1.6L10 5.8Z" stroke="#0f2b3d" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4.5 15.5h11" stroke="#0f2b3d" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconFactory() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3.5 16.5V10l3.3 2.2V9.3l3.3 2.2V6.6l3.4 2.2v7.7H3.5Z"
        stroke="#0f2b3d"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M3.5 16.5h13" stroke="#0f2b3d" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="14.3" cy="4.3" r="1" fill="#1a6ea8" opacity="0.7" />
      <circle cx="15.7" cy="6.1" r="0.7" fill="#1a6ea8" opacity="0.5" />
    </svg>
  );
}

function IconCow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.2 5.2c-.4-1.3.3-2.2 1.3-2.2M12.8 5.2c.4-1.3-.3-2.2-1.3-2.2" stroke="#0f2b3d" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="3.6" cy="10" rx="1.7" ry="2.4" fill="#0f2b3d" transform="rotate(-25 3.6 10)" />
      <ellipse cx="16.4" cy="10" rx="1.7" ry="2.4" fill="#0f2b3d" transform="rotate(25 16.4 10)" />
      <circle cx="10" cy="11" r="5.4" stroke="#0f2b3d" strokeWidth="1.3" />
      <circle cx="7.8" cy="10" r="0.9" fill="#0f2b3d" />
      <circle cx="12.2" cy="10" r="0.9" fill="#0f2b3d" />
      <ellipse cx="10" cy="13.5" rx="2.6" ry="1.7" stroke="#0f2b3d" strokeWidth="1.2" />
      <circle cx="8.9" cy="13.5" r="0.45" fill="#0f2b3d" />
      <circle cx="11.1" cy="13.5" r="0.45" fill="#0f2b3d" />
    </svg>
  );
}

const CATEGORIES: Category[] = [
  {
    label: 'Data centers',
    color: '#1a6ea8',
    amount: '228B gal',
    value: 228e9,
    multiplier: null,
    multiplierColor: '#1a6ea8',
    icon: <IconServer />,
  },
  {
    label: 'Golf courses',
    color: '#7cc39a',
    amount: '547B gal',
    value: 547e9,
    multiplier: '2.4×',
    multiplierColor: '#0f2b3d',
    icon: <IconGolf />,
  },
  {
    label: 'Fast fashion',
    color: '#e6a6bc',
    amount: '5.5T gal',
    value: 5.5e12,
    multiplier: '24×',
    multiplierColor: '#0f2b3d',
    icon: <IconHanger />,
  },
  {
    label: 'Fossil fuel plants',
    color: '#98a1a7',
    amount: '48.5T gal',
    value: 48.5e12,
    multiplier: '213×',
    multiplierColor: '#0f2b3d',
    icon: <IconFactory />,
  },
  {
    label: 'Meat industry',
    color: '#e0a17f',
    amount: '72T gal',
    value: 72e12,
    multiplier: '316×',
    multiplierColor: '#4a2f1e',
    icon: <IconCow />,
  },
];

// Log scale from 100B to 100T gallons, spanning three decades.
const SCALE_MIN = Math.log10(100e9);
const SCALE_MAX = Math.log10(100e12);
const TICKS = [
  { label: '100B', value: 100e9 },
  { label: '1T', value: 1e12 },
  { label: '10T', value: 10e12 },
  { label: '100T', value: 100e12 },
];

function pctForValue(value: number) {
  return ((Math.log10(value) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
}

export function InContext() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="context" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px) clamp(48px,7vw,80px)' }}>
      <div style={{ borderTop: '1px solid #dbe3e9', paddingTop: 'clamp(36px,5vw,56px)' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1a6ea8', fontWeight: 600, marginBottom: 14 }}>
          In context
        </div>
        <h2
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontWeight: 600,
            fontSize: 'clamp(1.6rem,3.4vw,2.4rem)',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          How much is that, really?
        </h2>
        <p style={{ margin: '0 0 32px', color: '#5b7183', fontSize: 15.5, maxWidth: 660, textWrap: 'pretty', lineHeight: 1.6 }}>
          The counter is a big number, but so is almost everything at national scale. Set against other things the
          United States pours water into each year, data centers are today a small, fast-growing slice. Bars are shown
          on a log scale so smaller categories stay visible; the multiplier is the honest comparison.
        </p>

        <div ref={cardRef} style={{ background: '#fff', border: '1px solid #dbe3e9', borderRadius: 12, padding: 'clamp(20px,3vw,32px)' }}>
          <div style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 600, fontSize: '1.15rem', marginBottom: 2 }}>
            Annual water usage
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a9aa6', fontWeight: 600, marginBottom: 26 }}>
            United States · estimated
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {TICKS.map((tick) => (
                <div
                  key={tick.label}
                  style={{ position: 'absolute', left: `${pctForValue(tick.value)}%`, top: 0, bottom: 0, width: 1, background: '#eef2f5' }}
                />
              ))}
            </div>

            {CATEGORIES.map((cat, i) => (
              <div key={cat.label} style={{ position: 'relative', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {cat.icon}
                    <span style={{ fontWeight: 600, fontSize: 14.5 }}>{cat.label}</span>
                  </div>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#8a9aa6' }}>{cat.amount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    className="context-bar-fill"
                    style={{
                      height: 34,
                      width: visible ? `${pctForValue(cat.value)}%` : '0%',
                      background: cat.color,
                      borderRadius: 999,
                      flexShrink: 0,
                      transitionDelay: `${i * 90}ms`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: cat.multiplierColor,
                      letterSpacing: cat.multiplier === null ? '0.02em' : undefined,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.multiplier === null ? 'baseline · 1×' : cat.multiplier}
                  </span>
                </div>
              </div>
            ))}

            <div style={{ position: 'relative', height: 16, marginTop: 4 }}>
              {TICKS.map((tick, i) => (
                <span
                  key={tick.label}
                  style={{
                    position: 'absolute',
                    left: `${pctForValue(tick.value)}%`,
                    transform: i === 0 ? 'none' : i === TICKS.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: 12,
                    color: '#8a9aa6',
                  }}
                >
                  {tick.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p style={{ margin: '24px 0 0', color: '#5b7183', fontSize: 14.5, lineHeight: 1.6, maxWidth: 680, textWrap: 'pretty' }}>
          The takeaway isn't that data-center water use doesn't matter. It's{' '}
          <em style={{ fontStyle: 'italic', color: '#0f2b3d' }}>where</em> and{' '}
          <em style={{ fontStyle: 'italic', color: '#0f2b3d' }}>how fast</em>. A single thirsty campus dropped into an
          already drought-stressed town can strain a local supply long before it registers on a national chart like
          this one.
        </p>
      </div>
    </section>
  );
}
