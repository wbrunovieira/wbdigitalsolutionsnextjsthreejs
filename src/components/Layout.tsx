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
      {/* 
      <div className='bg-custom-gradient bg-[#350545] absolute inset-0 max-h-screen'></div>
      <div className='pointer-events-none relative inset-0 h-full  opacity-20 mix-blend-soft-light '></div> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
