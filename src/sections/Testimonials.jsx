import { useEffect, useMemo, useRef, useState } from 'react';

const Testimonials = ({ items = [] }) => {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef(null);

  const total = slides.length;
  const goTo = (next, behavior = 'smooth') => {
    if (!total) return;
    const target = ((next % total) + total) % total;
    setActiveIndex(target);
    const viewport = viewportRef.current;
    if (viewport) {
      const offset = target * viewport.clientWidth;
      viewport.scrollTo({ left: offset, behavior });
    }
  };
  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const handleScroll = () => {
      const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
      setActiveIndex((prev) => (prev !== index ? index : prev));
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => goTo(activeIndex, 'auto');
    window.addEventListener('resize', handleResize);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, total]);

  return (
    <section className="section" id="stories">
      <div className="container">
        <div className="section-header">
          <p className="kicker">Trusted daily</p>
          <h2>What customers say</h2>
          <p className="muted">Reflect is built for people who care about their thinking. A few highlights from the community.</p>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-viewport" ref={viewportRef} aria-live="polite">
            <div className="testimonial-track">
            {slides.map((item, idx) => (
              <div key={item.name} className="testimonial-slide" aria-roledescription="slide" aria-label={`${idx + 1} of ${total}`}>
                <div className="card testimonial">
                  <div className="testimonial-head">
                    <img src={item.avatar} alt={item.name} className="avatar" loading="lazy" />
                    <div>
                      <div className="strong">{item.name}</div>
                    </div>
                  </div>
                  <p className="quote">“{item.quote}”</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
