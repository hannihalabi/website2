import Button from '../components/Button';

const CallToAction = () => {
  return (
    <section className="section cta" aria-labelledby="cta">
      <div className="container cta-inner">
        <div>
          <p className="kicker">Get started</p>
          <h2 id="cta">Put Reflect to work today.</h2>
          <p className="muted">Start a free trial or book a demo to see how Reflect fits your workflow.</p>
        </div>
        <div className="hero-actions">
          <Button label="Start free trial" href="#pricing" variant="primary" />
          <Button label="Book a demo" href="#company" variant="secondary" />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
