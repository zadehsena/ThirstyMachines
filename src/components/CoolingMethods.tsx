import type { ReactNode } from 'react';

interface Method {
  image: string;
  dots: boolean[]; // true = filled/active
  tagColor: string;
  tag: string;
  title: string;
  body: ReactNode;
}

const METHODS: Method[] = [
  {
    image: '/images/cool-evaporative.svg',
    dots: [true, true, true],
    tagColor: '#1a6ea8',
    tag: 'High water use',
    title: 'Evaporative & cooling towers',
    body: 'Warm water is trickled through towers where a fraction evaporates, carrying heat into the air, the same way sweating cools skin. Cheap and very effective, but the evaporated water is gone for good. This is the thirstiest method, and the biggest dots on the map above almost all use it, especially in hot, dry regions.',
  },
  {
    image: '/images/cool-air.svg',
    dots: [true, false, false],
    tagColor: '#5b7183',
    tag: 'Low water use',
    title: 'Air & free cooling',
    body: 'When the outside air is cold enough, big fans simply push it through the servers, no evaporation needed. It uses far more electricity for fans but very little water, which is why cool-climate sites in Finland, Denmark and the Pacific Northwest score so low. Its catch: it barely works during heat waves, exactly when water is scarcest.',
  },
  {
    image: '/images/cool-closedloop.svg',
    dots: [true, false, false],
    tagColor: '#5b7183',
    tag: 'Low ongoing use',
    title: 'Closed-loop & liquid cooling',
    body: 'The same water (or coolant) circulates in a sealed loop, often piped right onto the chips, and is chilled and reused instead of evaporated. A large volume is filled once, then topped up only slightly. Increasingly used for dense AI hardware; it shifts the burden back toward electricity, but keeps day-to-day water draw small.',
  },
];

export function CoolingMethods() {
  return (
    <section id="cooling" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px) clamp(48px,7vw,80px)' }}>
      <div style={{ borderTop: '1px solid #dbe3e9', paddingTop: 'clamp(36px,5vw,56px)' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1a6ea8', fontWeight: 600, marginBottom: 14 }}>
          Why water?
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
          Servers run hot. Water carries the heat away.
        </h2>
        <p style={{ margin: '0 0 32px', color: '#5b7183', fontSize: 15.5, maxWidth: 660, textWrap: 'pretty', lineHeight: 1.6 }}>
          A data center is a room full of chips turning electricity into heat. That heat has to go somewhere, and moving
          it with water is cheap and effective, which is why cooling, not drinking or sanitation, is where nearly all of
          a site's water goes. How <em style={{ fontStyle: 'italic', color: '#0f2b3d' }}>much</em> water depends almost
          entirely on the cooling method.
        </p>

        <div className="cooling-cards">
          {METHODS.map((m) => (
            <div
              key={m.title}
              className="cooling-card"
              style={{ background: '#fff', border: '1px solid #dbe3e9', borderRadius: 12, overflow: 'hidden' }}
            >
              <div style={{ background: '#eef3f6', lineHeight: 0 }}>
                <img src={m.image} alt="" width={320} height={150} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  {m.dots.map((filled, i) => (
                    <svg key={i} width="11" height="16" viewBox="0 -1 16 24" fill="none">
                      <path
                        d="M8 0C8 0 0 10.5 0 14a8 8 0 0 0 16 0C16 10.5 8 0 8 0Z"
                        fill={filled ? '#1a6ea8' : '#e2e9ee'}
                        stroke={filled ? 'none' : '#cdd8df'}
                        strokeWidth={filled ? 0 : 1.5}
                      />
                    </svg>
                  ))}
                  <span style={{ marginLeft: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: m.tagColor }}>
                    {m.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 600, fontSize: '1.25rem', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                  {m.title}
                </h3>
                <p style={{ margin: 0, color: '#5b7183', fontSize: 14.5, lineHeight: 1.6, textWrap: 'pretty' }}>{m.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ margin: '28px 0 0', color: '#8a9aa6', fontSize: 13, lineHeight: 1.55, maxWidth: 660, textWrap: 'pretty' }}>
          Most large campuses mix methods (free cooling in winter, evaporative in summer), so a single site's annual
          water use reflects its local climate as much as its technology.
        </p>
      </div>
    </section>
  );
}
