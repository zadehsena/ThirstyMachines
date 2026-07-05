export function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '28px clamp(20px,5vw,48px)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 12.5,
        color: '#8a9aa6',
      }}
    >
      <span>Thirsty Machines · an independent estimate</span>
      <span>Figures are educated estimates · last modeled 2026</span>
    </footer>
  );
}
