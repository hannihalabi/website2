import React, { useState } from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';

const Header = ({ navItems = [] }) => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header${menuOpen ? ' header--menu-open' : ''}`}>
      <div className="container header-inner">
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
          <div className="header-actions">
            <a className="muted" href="#pricing" onClick={closeMenu}>
              {t('header.login')}
            </a>
            <Button label={t('header.startTrial')} href="#pricing" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
