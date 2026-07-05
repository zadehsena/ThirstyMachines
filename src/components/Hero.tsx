import { useEffect, useRef } from 'react';

const ANNUAL_ESTIMATE_BN = 560;
const YEAR_START = Date.UTC(2026, 0, 1);

function rate() {
  return (ANNUAL_ESTIMATE_BN * 1e9) / (365 * 24 * 3600);
}

export function Hero() {
  const counterRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const secs = (Date.now() - YEAR_START) / 1000;
      const liters = Math.max(0, secs * rate());
      if (counterRef.current) {
        counterRef.current.textContent = Math.floor(liters).toLocaleString('en-US');
      }
      if (poolRef.current) {
        poolRef.current.textContent = Math.floor(liters / 2_500_000).toLocaleString('en-US');
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,48px) clamp(40px,6vw,64px)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#1a6ea8',
          fontWeight: 600,
          marginBottom: 22,
        }}
      >
        Estimated water consumed by data centers · 2026
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div
          ref={counterRef}
          style={{
            fontFamily: "'IBM Plex Mono',monospace",
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
            fontSize: 'clamp(2.6rem,9vw,6.6rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#0f2b3d',
          }}
        >
          0
        </div>
        <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 'clamp(1.1rem,2.4vw,1.7rem)', fontStyle: 'italic', color: '#5b7183' }}>
          liters
        </div>
      </div>
      <div style={{ marginTop: 22, fontSize: 15, color: '#5b7183' }}>
        about <span style={{ color: '#0f2b3d', fontWeight: 600 }}>{Math.round(rate()).toLocaleString('en-US')}</span> liters
        every second, and counting
      </div>
      <div style={{ marginTop: 8, fontSize: 15, color: '#8a9aa6' }}>
        ≈ <span ref={poolRef} style={{ color: '#5b7183', fontWeight: 500 }}>0</span> Olympic swimming pools so far this year
      </div>
      <div
        style={{
          marginTop: 30,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12.5,
          color: '#8a9aa6',
          maxWidth: 560,
          textWrap: 'pretty',
          lineHeight: 1.5,
        }}
      >
        These are educated estimates, not audited figures — most operators do not disclose site-level water use.{' '}
        <a href="#methodology" style={{ color: '#1a6ea8', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
          See how →
        </a>
      </div>
    </section>
  );
}
