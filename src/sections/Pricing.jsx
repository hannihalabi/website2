import Button from '../components/Button';
import Orb from '../components/Orb';

const Pricing = ({ content }) => {
  const features = content.features || [];
  const midpoint = Math.ceil(features.length / 2);
  const columns = [features.slice(0, midpoint), features.slice(midpoint)];

  return (
    <section className="section pricing-sphere" id={content.id} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="pricing-orb">
          <div className="pricing-orb-bg">
            <Orb hoverIntensity={0.5} rotateOnHover forceHoverState hue={0} />
          </div>
          <span className="pricing-pill">Get access</span>
          <h2 className="pricing-headline">
            We like keeping things simple
            <br />
            One plan one price.
          </h2>
          <div className="pricing-amount-row">
            <div className="price-large">{content.price}</div>
            <div className="price-meta">
              <div className="price-period">/ {content.period}</div>
              <div className="muted small">billed annually</div>
            </div>
          </div>

          <div className="pricing-features">
            {columns.map((col, idx) => (
              <ul key={idx}>
                {col.map((feature) => (
                  <li key={feature}>
                    <span className="pricing-dot" />
                    {feature}
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="pricing-cta">
            <Button label={content.cta.label} href={content.cta.href} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
