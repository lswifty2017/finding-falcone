import React from 'react';
import './Button.scss';

const Button = ({ text = '', onClick, bgColor = '' }) => {
  return (
    <button
      className={bgColor ? `button button--${bgColor}` : 'button'}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
