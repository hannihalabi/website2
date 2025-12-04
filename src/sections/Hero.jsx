import { useEffect, useMemo, useRef, useState } from 'react';
import Hyperspeed from '../components/Hyperspeed';
import { hyperspeedPresets } from '../components/HyperSpeedPresets';

const Hero = ({ content, navItems = [] }) => {
  const rotatingWords = content.rotatingWords || ['Webdesign', 'Artificial Intelligence', 'SEO'];
  const [wordIndex, setWordIndex] = useState(0);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const heroHyperspeedOptions = useMemo(
    () => ({
      ...hyperspeedPresets.one,
      speedUp: (hyperspeedPresets.one.speedUp || 0) * 0.3,
      movingAwaySpeed: [
        hyperspeedPresets.one.movingAwaySpeed[0] * 0.3,
        hyperspeedPresets.one.movingAwaySpeed[1] * 0.3
      ],
      movingCloserSpeed: [
        hyperspeedPresets.one.movingCloserSpeed[0] * 0.3,
        hyperspeedPresets.one.movingCloserSpeed[1] * 0.3
      ]
    }),
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, [rotatingWords.length]);
  useEffect(() => {
    if (!content.heroVideo) {
      setShowReplayButton(false);
      return;
    }
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playVideo = async () => {
      setShowReplayButton(false);
      try {
        videoEl.currentTime = 0;
        await videoEl.play();
      } catch {
        setShowReplayButton(true);
      }
    };

    playVideo();

    return () => {
      videoEl.pause();
    };
  }, [content.heroVideo]);

  const handleReplay = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    setShowReplayButton(false);
    try {
      videoEl.currentTime = 0;
      await videoEl.play();
    } catch {
      setShowReplayButton(true);
    }
  };

  const handleVideoToggle = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      setShowReplayButton(false);
      try {
        await videoEl.play();
      } catch {
        setShowReplayButton(true);
      }
    } else {
      videoEl.pause();
      setShowReplayButton(true);
    }
  };

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="hero" id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <Hyperspeed effectOptions={heroHyperspeedOptions} />
        </div>
      </div>
      <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-menu">
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`header-nav${menuOpen ? ' is-open' : ''}`}>
            <nav className="nav">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="hero-copy">
          <p className="kicker">{content.kicker}</p>
          <h1>
            <span className="hero-title-primary">{content.title}</span>
            <span key={rotatingWords[wordIndex]} className="hero-rotating-word hero-title-secondary">
              {rotatingWords[wordIndex]}
            </span>
          </h1>
          <p className="lead">{content.subtitle}</p>
        </div>
        <div className="hero-visual">
          <div className="hero-panel">
            <div className="glow" />
            {content.heroVideo ? (
              <div className="hero-video-shell">
                <video
                  ref={videoRef}
                  src={content.heroVideo}
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label="Reflect app video"
                  onEnded={() => setShowReplayButton(true)}
                  onClick={handleVideoToggle}
                />
                {showReplayButton && (
                  <button
                    type="button"
                    onClick={handleReplay}
                    aria-label="Play hero video"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '64px',
                      height: '64px',
                      borderRadius: '9999px',
                      border: 'none',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    ▶
                  </button>
                )}
              </div>
            ) : (
              <img src={content.heroImage} alt="Reflect app" loading="lazy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
