// components/Nav.tsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Nav: React.FC = () => {
  const { setLanguage } = useLanguage();

  return (
    <div>
      <button className='btn' onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pt-BR')}>Português</button>
      <button onClick={() => setLanguage('pt')}>Português -pt</button>
      <button onClick={() => setLanguage('it')}>Italiano</button>
      <button onClick={() => setLanguage('es')}>espanhol</button>
      {/* Inclua mais botões para outros idiomas, se necessário */}
    </div>
  );
};

export default Nav;
