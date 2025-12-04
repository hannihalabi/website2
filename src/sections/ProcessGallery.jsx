import { useEffect, useRef } from 'react';

const galleryImages = [
  {
    src: '/process-gallery/dolce.mov',
    poster: '/process-gallery/process-01.webp',
    alt: 'Dolce prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/cinedept2.mov',
    poster: '/process-gallery/process-02.webp',
    alt: 'CineDept prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/rabbit.mov',
    poster: '/process-gallery/process-03.webp',
    alt: 'Rabbit prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/poly.mov',
    poster: '/process-gallery/process-04.webp',
    alt: 'Poly prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/analogue.mov',
    poster: '/process-gallery/process-05.webp',
    alt: 'Analogue prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/ets.mov',
    poster: '/process-gallery/process-06.webp',
    alt: 'ETS prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/obsession.mov',
    poster: '/process-gallery/process-07.webp',
    alt: 'Obsession prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: '/process-gallery/schibler.mov',
    poster: '/process-gallery/process-08.webp',
    alt: 'Schibler prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
];

const ProcessGallery = ({ content }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const track = gridRef.current;
    if (!track || typeof window === 'undefined') return undefined;

    const items = Array.from(track.querySelectorAll('.process-gallery__item'));
    if (!items.length) return undefined;

    const centerStartSlide = () => {
      const item = items[0];
      if (!item) return;
      track.scrollTo({ left: item.offsetLeft, behavior: 'auto' });
    };

    centerStartSlide();

    const handleResize = () => centerStartSlide();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [galleryImages.length]);

  useEffect(() => {
    const track = gridRef.current;
    if (!track || typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const videos = Array.from(track.querySelectorAll('video'));
    if (!videos.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoEl = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    videos.forEach((video) => {
      video.pause();
      observer.observe(video);
    });

    return () => {
      videos.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, [galleryImages.length]);

  return (
    <section className="section process-gallery-section" id="process-gallery">
      <div className="container">
        <div className="process-gallery-header">
          <p className="kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
          <p className="muted">{content.description}</p>
        </div>
        <div className="process-gallery">
          <div className="process-gallery__grid" ref={gridRef}>
            {galleryImages.map((image, index) => (
              <figure
                key={image.src}
                className="process-gallery__item"
                style={{
                  '--process-gallery-aspect': image.aspect || undefined,
                  '--process-gallery-card-width': 'clamp(280px, 72vw, 480px)',
                }}
              >
                {image.type === 'video' ? (
                  <video
                    src={image.src}
                    muted
                    loop
                    playsInline
                    controls={false}
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessGallery;
