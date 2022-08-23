import React, { SyntheticEvent } from 'react';

interface ButtonProps {
  onClick: (e: SyntheticEvent) => void;
  text: string;
  extraClasses?: string;
  icon?: string;
}

function Button({ onClick, text, extraClasses = '', icon }: ButtonProps) {
  return (
    <button className={`button ${extraClasses}`} onClick={onClick} type="button">
      {icon && <i className={`fa fa-${icon}`} />}
      {text}
    </button>
  );
}

Button.defaultProps = {
  extraClasses: '',
  icon: '',
};

export default Button;
