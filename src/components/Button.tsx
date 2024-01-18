import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
}

export const Button: React.FC<ButtonProps> = ({ text, href }) => {
  const buttonStyle = {
    '--button-text': `"${text}"`,
  } as React.CSSProperties;

  return (
    <a href={href} className='custom-button z-50 p-2' style={buttonStyle}></a>
  );
};
