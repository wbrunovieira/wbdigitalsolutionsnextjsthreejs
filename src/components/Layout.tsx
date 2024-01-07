//use client
import React, { ReactNode } from 'react';
import Nav from './Nav';


type LayoutProps = {
    children: ReactNode;
  };

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Nav />
    <div className="bg-custom-gradient bg-[#350545] absolute inset-0 max-h-screen" >
    <div className="pointer-events-none absolute inset-0 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light">
    
      </div>
    </div> 
    <main>{children}</main>
    </>
  );
};

export default Layout;
