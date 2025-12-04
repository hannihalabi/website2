import { useEffect, useRef } from 'react';

const Team = ({ members = [] }) => {
  if (!members.length) return null;
  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return undefined;
    let frameId;

    const step = () => {
      if (!isPausedRef.current) {
        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
        if (maxScroll > 0) {
          scrollEl.scrollLeft += 0.5;
          if (scrollEl.scrollLeft >= maxScroll) {
            scrollEl.scrollLeft = 0;
          }
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [members.length]);

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1600);
  };

  const handleArrowClick = (direction) => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    pauseAutoScroll();
    const card = scrollEl.querySelector('.team-card');
    const step = card ? card.offsetWidth + 24 : 320;
    scrollEl.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className="section team-section" id="team">
      <div className="container">
        <div className="section-header centered">
          <p className="kicker">Workforce</p>
          <h2>The Team behind the Scenes</h2>
          <p className="muted">
            A multi-disciplinary crew of creatives, engineers, and researchers who obsess over quiet, considered
            workflows.
          </p>
        </div>
        <div className="team-carousel">
          <button
            type="button"
            className="team-arrow team-arrow-left"
            aria-label="Scroll team left"
            onClick={() => handleArrowClick(-1)}
          >
            ‹
          </button>
          <div
            className="team-loop"
            ref={scrollRef}
            onWheel={pauseAutoScroll}
            onTouchStart={pauseAutoScroll}
            onTouchMove={pauseAutoScroll}
          >
            <div className="team-track">
              {members.map((member) => (
                <article className="team-card" key={member.name}>
                  <div className="team-avatar">
                    <img src={member.image} alt={`${member.name} headshot`} loading="lazy" />
                  </div>
                  <div className="team-card-body">
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="muted team-bio">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="team-arrow team-arrow-right"
            aria-label="Scroll team right"
            onClick={() => handleArrowClick(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
