const Button = ({ label, href = '#', variant = 'primary' }) => {
  return (
    <a className={`btn btn-${variant}`} href={href}>
      <span>{label}</span>
    </a>
  );
};

export default Button;
