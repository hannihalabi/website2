const Showcase = ({ content, reversed = false, background = '' }) => {
  return (
    <section className={`section showcase ${reversed ? 'reversed' : ''} ${background}`} id={content.id}>
      <div className="container showcase-grid">
        <div className="showcase-copy">
          <p className="kicker">{content.label}</p>
          <h2>{content.title}</h2>
          <p className="muted">{content.description}</p>
          <ul className="bullets">
            {content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="showcase-visual">
          <div className="panel">
            <div className="panel-glow" />
            {content.video ? (
              <video
                src={content.video}
                poster={content.image}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                aria-label={content.title}
              />
            ) : (
              <img src={content.image} alt={content.title} loading="lazy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
