import { useEffect, useRef } from 'react';
import { GALLONS_PER_LITER, useUnit } from '../unit';

const ANNUAL_ESTIMATE_BN = 560;
const YEAR_START = Date.UTC(2026, 0, 1);

function rate() {
  return (ANNUAL_ESTIMATE_BN * 1e9) / (365 * 24 * 3600);
}

export function Hero() {
  const counterRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const { unit, setUnit, unitWord } = useUnit();

  useEffect(() => {
    const factor = unit === 'gal' ? GALLONS_PER_LITER : 1;
    const tick = () => {
      const secs = (Date.now() - YEAR_START) / 1000;
      const liters = Math.max(0, secs * rate());
      if (counterRef.current) {
        counterRef.current.textContent = Math.floor(liters * factor).toLocaleString('en-US');
      }
      if (poolRef.current) {
        poolRef.current.textContent = Math.floor(liters / 2_500_000).toLocaleString('en-US');
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, [unit]);

  const rateStr = Math.round(rate() * (unit === 'gal' ? GALLONS_PER_LITER : 1)).toLocaleString('en-US');

  const chipBase = {
    border: 'none',
    background: 'transparent',
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    padding: '6px 16px',
    borderRadius: 999,
    cursor: 'pointer',
    transition: 'all .15s',
  } as const;

  return (
    <section style={{ padding: 'clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)' }}>
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,48px)',
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
          {unitWord}
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', border: '1px solid #dbe3e9', borderRadius: 999, padding: 3, background: '#fff' }}>
          <button
            onClick={() => setUnit('L')}
            style={{ ...chipBase, ...(unit === 'gal' ? { color: '#5b7183' } : { background: '#0f2b3d', color: '#fff' }) }}
          >
            Liters
          </button>
          <button
            onClick={() => setUnit('gal')}
            style={{ ...chipBase, ...(unit === 'gal' ? { background: '#0f2b3d', color: '#fff' } : { color: '#5b7183' }) }}
          >
            Gallons
          </button>
        </div>
      </div>
      <div style={{ marginTop: 20, fontSize: 15, color: '#5b7183' }}>
        about <span style={{ color: '#0f2b3d', fontWeight: 600 }}>{rateStr}</span> {unitWord} every second, and counting
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
        These are educated estimates, not audited figures. Most operators do not disclose site-level water use.{' '}
        <a href="#methodology" style={{ color: '#1a6ea8', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
          See how →
        </a>
      </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div
          style={{
            position: 'relative',
            height: 120,
            marginTop: 'clamp(40px,6vw,72px)',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%', display: 'block' }}
          >
            <path
              className="wave-layer"
              style={{ animation: 'waveDrift 19s linear infinite' }}
              fill="rgba(26,110,168,0.10)"
              d="M0,70 q120,-20 240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 V120 H0 Z"
            />
            <path
              className="wave-layer"
              style={{ animation: 'waveDrift 12s linear infinite' }}
              fill="rgba(26,110,168,0.18)"
              d="M0,58 q120,-32 240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 V120 H0 Z"
            />
          </svg>

          <svg
            className="duck-float"
            viewBox="0 0 120 100"
            style={{
              position: 'absolute',
              bottom: 44,
              left: '58%',
              width: 46,
              height: 'auto',
              filter: 'drop-shadow(0 3px 3px rgba(15,43,61,0.15))',
            }}
          >
            <ellipse cx="48" cy="66" rx="42" ry="27" fill="#ffd23f" />
            <path d="M40,42 Q30,18 54,14 Q80,10 84,34 Q86,52 66,54 Q46,56 40,42 Z" fill="#ffd23f" />
            <path d="M88,32 Q106,28 106,36 Q106,44 88,41 Z" fill="#ff9f43" />
            <circle cx="76" cy="26" r="3.4" fill="#2b2b2b" />
          </svg>
        </div>
      </div>
    </section>
  );
}
