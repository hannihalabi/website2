import { useEffect, useRef } from 'react';

const processGalleryAsset = (file) => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/process-gallery/${file}`;
};

const galleryImages = [
  {
    src: processGalleryAsset('dolce.mov'),
    poster: processGalleryAsset('process-01.webp'),
    alt: 'Dolce prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('cinedept2.mov'),
    poster: processGalleryAsset('process-02.webp'),
    alt: 'CineDept prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('rabbit.mov'),
    poster: processGalleryAsset('process-03.webp'),
    alt: 'Rabbit prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('poly.mov'),
    poster: processGalleryAsset('process-04.webp'),
    alt: 'Poly prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('analogue.mov'),
    poster: processGalleryAsset('process-05.webp'),
    alt: 'Analogue prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('ets.mov'),
    poster: processGalleryAsset('process-06.webp'),
    alt: 'ETS prototype walkthrough',
    type: 'video',
    aspect: '1 / 2',
  },
  {
    src: processGalleryAsset('obsession.mov'),
    poster: processGalleryAsset('process-07.webp'),
    alt: 'Obsession prototype walkthrough',
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
    if (!track || typeof window === 'undefined') return undefined;

    const videos = Array.from(track.querySelectorAll('video'));
    if (!videos.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const isCentered = entry.intersectionRatio >= 0.6;

          if (isCentered) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    videos.forEach((video) => {
      video.preload = 'none';
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

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
                    preload="none"
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
