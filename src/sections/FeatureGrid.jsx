import { useEffect, useMemo, useRef } from 'react';

const FeatureGrid = ({ items = [] }) => {
  const gridRef = useRef(null);
  const twists = useMemo(() => items.map(() => Math.random() * 12 - 6), [items]);
  const offsets = useMemo(() => items.map(() => Math.random() * 40 - 20), [items]);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const cards = Array.from(gridEl.querySelectorAll('.card-animate'));
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aligned');
          }
        });
      },
      { threshold: 0.3 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <section className="section" id="features">
      <div className="container" ref={gridRef}>
        <div className="section-header">
          <p className="kicker">Product</p>
          <h2>Organized by default. Calm by design.</h2>
          <p className="muted" style={{ paddingBottom: '40px' }}>
            Build a personal website experience and create a flow that feels natural to navigate
          </p>
        </div>
        <div className="grid three">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="card card-animate"
              style={{ '--twist': `${twists[idx]}deg`, '--offset': `${offsets[idx]}%` }}
            >
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
              <ul className="bullets">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
