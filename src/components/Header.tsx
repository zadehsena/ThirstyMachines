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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
          <path d="M16 2C16 2 6 14.5 6 20a10 10 0 0 0 20 0C26 14.5 16 2 16 2Z" fill="#1a6ea8" />
          <ellipse cx="12.3" cy="23.5" rx="2.1" ry="3.1" fill="#ffffff" opacity="0.32" transform="rotate(-18 12.3 23.5)" />
        </svg>
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
