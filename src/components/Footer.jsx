const Footer = ({ links = [] }) => {
  return (
    <footer className="footer" id="company">
      <div className="container footer-bottom">
        <span className="muted">© {new Date().getFullYear()} Reflect Labs</span>
      </div>
    </footer>
  );
};

export default Footer;
