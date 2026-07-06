import { GALLONS_PER_LITER, useUnit } from '../unit';

// Both figures below are authored as "billions of liters"; converted to billions
// of the display unit when the page-wide toggle is set to gallons.
const ANNUAL_ESTIMATE_BN_LITERS = 560;
const LBL_ESTIMATE_BN_LITERS = 66;

export function Methodology() {
  const { unit, unitWord } = useUnit();
  const factor = unit === 'gal' ? GALLONS_PER_LITER : 1;
  const annualBn = (ANNUAL_ESTIMATE_BN_LITERS * factor).toLocaleString(undefined, { maximumFractionDigits: 1 });
  const lblBn = (LBL_ESTIMATE_BN_LITERS * factor).toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <section id="methodology" style={{ background: '#0f2b3d', color: '#dce6ed' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,48px)' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6fb0d8', fontWeight: 600, marginBottom: 18 }}>
          Methodology
        </div>
        <h2
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontWeight: 600,
            fontSize: 'clamp(1.7rem,3.6vw,2.6rem)',
            margin: '0 0 24px',
            color: '#ffffff',
            letterSpacing: '-0.01em',
            maxWidth: '18ch',
            textWrap: 'balance',
          }}
        >
          How we estimate what companies won't say
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
            gap: '26px 28px',
            fontSize: 14.5,
            lineHeight: 1.65,
            color: '#a9c1cf',
          }}
        >
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>The counter</div>
            The running total assumes roughly <span style={{ color: '#fff' }}>{annualBn} billion {unitWord}</span> of
            direct water consumption globally per year, spread evenly across the year. It counts from January 1, 2026. The
            global figure is triangulated from national reports (e.g. the U.S. Lawrence Berkeley Lab estimate of ~{lblBn} billion{' '}
            {unitWord} of direct data-center water use in 2023) scaled to worldwide capacity.
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>Per-site estimates</div>
            Individual campus figures combine disclosed sustainability-report numbers where they exist, publicly reported
            permit and utility filings, campus size and known cooling technology, and local climate. Sites using seawater or
            free-air cooling (e.g. in the Nordics) are estimated far lower than evaporative-cooled sites in hot, dry regions.
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>What's not counted</div>
            These are <span style={{ color: '#fff' }}>direct, on-site</span> figures: the water evaporated in cooling towers
            and used on-premises. They exclude the often-larger <span style={{ color: '#fff' }}>indirect</span> water
            footprint of generating the electricity the site consumes, which can multiply the total several times over.
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>Why it's uncertain</div>
            Most operators do not publish site-level water data, and definitions of "water use" vary. Treat every number here
            as an <span style={{ color: '#fff' }}>order-of-magnitude estimate</span> meant to convey scale, not a precise
            audit. Corrections and better data are welcome.
          </div>
        </div>
      </div>
    </section>
  );
}
