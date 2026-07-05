import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { Topology } from 'topojson-specification';
import { COMPANY_COLORS, SITES, type Operator, type Site } from '../data';

const DOT_SCALE = 0.52;

function fmtBillions(ml: number) {
  return (ml / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 }) + 'B L';
}

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<d3.Selection<SVGCircleElement, Site, SVGGElement, unknown> | null>(null);
  const drawnRef = useRef(false);

  const [company, setCompany] = useState<Operator | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || drawnRef.current) return;
    drawnRef.current = true;

    const w = el.clientWidth || 900;
    const h = Math.max(420, Math.min(560, Math.round(w * 0.52)));

    const svg = d3
      .select(el)
      .append('svg')
      .attr('width', '100%')
      .attr('height', h)
      .attr('viewBox', `0 0 ${w} ${h}`)
      .style('display', 'block')
      .style('cursor', 'grab');
    const g = svg.append('g');

    const tip = document.createElement('div');
    tip.style.cssText =
      'position:absolute; pointer-events:none; opacity:0; transition:opacity .12s; background:#0f2b3d; color:#fff; padding:7px 10px; border-radius:7px; font-size:12px; font-family:Libre Franklin,sans-serif; box-shadow:0 6px 18px rgba(15,43,61,.28); z-index:5; white-space:nowrap; transform:translate(-50%,-115%);';
    el.appendChild(tip);

    let resizeHandler: (() => void) | null = null;

    fetch('/data/countries-110m.json')
      .then((r) => r.json())
      .then((topo: Topology) => {
        const countries = topojson.feature(topo, topo.objects.countries) as unknown as GeoJSON.FeatureCollection;
        const proj = d3.geoNaturalEarth1().fitExtent(
          [
            [10, 10],
            [w - 10, h - 10],
          ],
          countries,
        );
        const path = d3.geoPath(proj as unknown as d3.GeoProjection);

        g.append('g')
          .selectAll('path')
          .data(countries.features)
          .join('path')
          .attr('d', path)
          .attr('fill', '#e6edf1')
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 0.6);

        const circles = g
          .append('g')
          .selectAll<SVGCircleElement, Site>('circle')
          .data(SITES)
          .join('circle')
          .attr('cx', (d) => proj([d.lng, d.lat])![0])
          .attr('cy', (d) => proj([d.lng, d.lat])![1])
          .attr('r', (d) => Math.sqrt(d.ml) * DOT_SCALE)
          .attr('fill', (d) => COMPANY_COLORS[d.operator])
          .attr('fill-opacity', 0.5)
          .attr('stroke', (d) => COMPANY_COLORS[d.operator])
          .attr('stroke-width', 1.2)
          .style('cursor', 'pointer')
          .on('mouseenter', (_e, d) => {
            tip.innerHTML = `<b>${d.operator} · ${d.name}</b><br>~${fmtBillions(d.ml)} / year`;
            tip.style.opacity = '1';
          })
          .on('mousemove', (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            tip.style.left = e.clientX - rect.left + 'px';
            tip.style.top = e.clientY - rect.top + 'px';
          })
          .on('mouseleave', () => {
            tip.style.opacity = '0';
          })
          .on('click', (e: MouseEvent, d) => {
            e.stopPropagation();
            setSelected(SITES.indexOf(d));
          });

        circlesRef.current = circles;

        const zoom = d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 8])
          .on('zoom', (ev) => g.attr('transform', ev.transform.toString()));
        svg.call(zoom).on('click', () => setSelected(null));

        resizeHandler = () => {
          const nw = el.clientWidth;
          if (!nw) return;
          const nh = Math.max(420, Math.min(560, Math.round(nw * 0.52)));
          const np = d3.geoNaturalEarth1().fitExtent(
            [
              [10, 10],
              [nw - 10, nh - 10],
            ],
            countries,
          );
          const npath = d3.geoPath(np as unknown as d3.GeoProjection);
          svg.attr('viewBox', `0 0 ${nw} ${nh}`).attr('height', nh);
          g.attr('transform', null);
          svg.property('__zoom', d3.zoomIdentity);
          g.selectAll<SVGPathElement, GeoJSON.Feature>('path').attr('d', npath);
          circles.attr('cx', (d) => np([d.lng, d.lat])![0]).attr('cy', (d) => np([d.lng, d.lat])![1]);
        };
        window.addEventListener('resize', resizeHandler);

        applyVisuals(circles, company, selected);
      });

    return () => {
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      tip.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (circlesRef.current) applyVisuals(circlesRef.current, company, selected);
  }, [company, selected]);

  function applyVisuals(
    circles: d3.Selection<SVGCircleElement, Site, SVGGElement, unknown>,
    comp: Operator | null,
    sel: number | null,
  ) {
    circles
      .attr('fill-opacity', (d) => (comp && d.operator !== comp ? 0.03 : 0.5))
      .attr('stroke-opacity', (d) => (comp && d.operator !== comp ? 0.06 : 1))
      .style('pointer-events', (d) => (comp && d.operator !== comp ? 'none' : 'all'))
      .attr('stroke-width', (d) => (sel != null && SITES[sel] === d ? 2.6 : 1.2));
  }

  const chips: { label: string; key: Operator | null; color: string | null }[] = [
    { label: 'All sites', key: null, color: null },
    { label: 'Google', key: 'Google', color: COMPANY_COLORS.Google },
    { label: 'Amazon', key: 'Amazon', color: COMPANY_COLORS.Amazon },
    { label: 'Microsoft', key: 'Microsoft', color: COMPANY_COLORS.Microsoft },
    { label: 'Meta', key: 'Meta', color: COMPANY_COLORS.Meta },
  ];

  const sel = selected != null ? SITES[selected] : null;

  return (
    <section id="map" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px) clamp(48px,7vw,80px)' }}>
      <div style={{ borderTop: '1px solid #dbe3e9', paddingTop: 'clamp(36px,5vw,56px)' }}>
        <h2
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontWeight: 600,
            fontSize: 'clamp(1.6rem,3.4vw,2.4rem)',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}
        >
          Where the water goes
        </h2>
        <p style={{ margin: '0 0 24px', color: '#5b7183', fontSize: 15.5, maxWidth: 640, textWrap: 'pretty', lineHeight: 1.55 }}>
          A selection of major hyperscale data-center campuses. Each dot is sized by its estimated annual water
          consumption. Click a dot for detail, or filter by operator.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {chips.map((chip) => {
            const on = chip.key === null ? company === null : company === chip.key;
            return (
              <button
                key={chip.label}
                onClick={() => setCompany((prev) => (prev === chip.key ? null : chip.key))}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  border: '1px solid ' + (on ? '#0f2b3d' : '#dbe3e9'),
                  background: on ? '#0f2b3d' : '#fff',
                  color: on ? '#fff' : '#5b7183',
                }}
              >
                {chip.color && (
                  <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: chip.color }} />
                )}
                {chip.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', background: '#ffffff', border: '1px solid #dbe3e9', borderRadius: 12, overflow: 'hidden' }}>
          <div ref={mapRef} style={{ position: 'relative', width: '100%', minHeight: 420 }} />

          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #dbe3e9',
              borderRadius: 8,
              padding: '12px 14px',
              fontSize: 11.5,
              color: '#5b7183',
            }}
          >
            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#8a9aa6', fontSize: 10, marginBottom: 10 }}>
              Est. water / year
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'block', width: 14, height: 14, borderRadius: '50%', background: 'rgba(26,110,168,0.4)', border: '1px solid #1a6ea8' }} />
                ~0.3B L
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'block', width: 26, height: 26, borderRadius: '50%', background: 'rgba(26,110,168,0.4)', border: '1px solid #1a6ea8' }} />
                ~1.5B L
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'block', width: 40, height: 40, borderRadius: '50%', background: 'rgba(26,110,168,0.4)', border: '1px solid #1a6ea8' }} />
                ~4B L
              </div>
            </div>
          </div>

          {sel && (
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 300,
                maxWidth: 'calc(100% - 32px)',
                background: '#ffffff',
                border: '1px solid #dbe3e9',
                borderRadius: 10,
                boxShadow: '0 12px 32px rgba(15,43,61,0.14)',
                padding: '18px 18px 20px',
                animation: 'fadeUp 0.18s ease',
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 26,
                  height: 26,
                  border: 'none',
                  background: '#f4f7f9',
                  borderRadius: '50%',
                  color: '#5b7183',
                  cursor: 'pointer',
                  fontSize: 15,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: COMPANY_COLORS[sel.operator] }} />
                <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a9aa6', fontWeight: 600 }}>
                  {sel.operator}
                </span>
              </div>
              <div style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 600, fontSize: 18, lineHeight: 1.25, marginBottom: 2 }}>
                {sel.name}
              </div>
              <div style={{ fontSize: 13, color: '#5b7183', marginBottom: 16 }}>{sel.loc}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 26, fontWeight: 500, color: '#0f2b3d', letterSpacing: '-0.01em' }}>
                {(sel.ml / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}B
              </div>
              <div style={{ fontSize: 12.5, color: '#8a9aa6', marginBottom: 14 }}>
                estimated liters / year · ≈ {Math.round(sel.ml / 2.5).toLocaleString('en-US')} pools
              </div>
              <div style={{ fontSize: 13, color: '#5b7183', lineHeight: 1.5, textWrap: 'pretty', borderTop: '1px solid #eef2f5', paddingTop: 12 }}>
                {sel.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 16, fontSize: 12.5, color: '#5b7183' }}>
          {(['Google', 'Amazon', 'Microsoft', 'Meta'] as Operator[]).map((op) => (
            <div key={op} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: COMPANY_COLORS[op] }} />
              {op}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
