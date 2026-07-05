export function Header() {
  return (
    <header
      style={{
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
      <nav style={{ display: 'flex', gap: 24, fontSize: 13.5, color: '#5b7183' }}>
        <a href="#map" style={{ textDecoration: 'none' }}>
          Map
        </a>
        <a href="#methodology" style={{ textDecoration: 'none' }}>
          Methodology
        </a>
      </nav>
    </header>
  );
}
