// components/Layout.tsx
import React, { ReactNode } from 'react';
import Nav from './Nav';


type LayoutProps = {
    children: ReactNode;
  };

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <div className='bg-red'>
      <Nav />
    
    
      <main>{children}</main>
    </div> 
    </>
  );
};

export default Layout;
