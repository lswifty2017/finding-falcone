import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__link">
        <button>Reset</button>
      </div>
      <div className="header__link">
        <a href="/">Home</a>
      </div>
    </div>
  );
};

export default Header;
