import { useState } from 'react';

const LINKS = [
  { href: '#map', label: 'Map' },
  { href: '#cooling', label: 'Why water' },
  { href: '#context', label: 'In context' },
  { href: '#methodology', label: 'Methodology' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px clamp(20px,5vw,64px)',
        borderBottom: '1px solid #dbe3e9',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1a6ea8' }} />
        <span style={{ fontWeight: 700, letterSpacing: '-0.01em', fontSize: 15 }}>
          Thirsty Machines
        </span>
      </div>

      <nav className="nav-desktop">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 4 L18 18 M18 4 L4 18" stroke="#0f2b3d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 6 H19 M3 11 H19 M3 16 H19" stroke="#0f2b3d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <nav className="nav-mobile-panel">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
