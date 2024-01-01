<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Ubuntu+Mono:wght@700&display=swap" rel="stylesheet">

Implementando o Botão de Troca de Idioma
Para implementar um botão de troca de idioma, você pode seguir estes passos:

Criar uma Função para Alterar o Idioma: No seu contexto de idioma, crie uma função que permita alterar o idioma atual.

Usar essa Função no Botão: Em seus componentes, inclua um botão que, ao ser clicado, chame essa função para alterar o idioma.

Exemplo
Aqui está um exemplo simplificado de como isso pode ser implementado:

Atualizando o LanguageContext para Incluir uma Função de Alteração de Idioma
jsx
Copy code
// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
Usando o Botão de Troca de Idioma em um Componente
jsx
Copy code
// Em algum componente
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { setLanguage } = useLanguage();

  return (
    <div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pt')}>Português</button>
      {/* Adicione botões para outros idiomas conforme necessário */}
    </div>
  );
};

export default LanguageSwitcher;
Neste exemplo, o LanguageSwitcher é um componente que contém botões para alterar o idioma. Quando um desses botões é clicado, a função setLanguage é chamada com o novo idioma, atualizando o contexto e, consequentemente, atualizando todos os componentes que dependem desse contexto. Isso resultará na atualização dos textos traduzidos em toda a aplicação sem a necessidade de recarregar a página.