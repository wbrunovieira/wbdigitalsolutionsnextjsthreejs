// components/Layout.tsx
import React, { ReactNode } from 'react';
import Nav from './Nav';

type LayoutProps = {
    children: ReactNode;
  };

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
     
    </>
  );
};

export default Layout;
