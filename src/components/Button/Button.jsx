import React from 'react';
import './Button.scss';

const Button = ({ text = '', onClick, bgColor = '', disabled = true }) => {
  return (
    <button
      disabled={disabled}
      className={bgColor ? `button button--${bgColor}` : 'button'}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
