import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
}

export const Button: React.FC<ButtonProps> = ({ text, href }) => {
  return (
    <>
      <div className='container-bright mb-4 z-50'>
        <div className='btn-bright'>
          <a href={href} target="_blank">{text}</a>
        </div>
      </div>
    </>
  );
};
