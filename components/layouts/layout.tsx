import React from 'react';
import Header from './header';
import Footer from './footer';
import Banner from './banner';

interface Props {
  children: React.ReactNode;
  hasFooter?: boolean;
}

const Layout: React.FC<Props> = ({ hasFooter, children }) => {
  return (
    <div>
      <Header />
      <div className='pt-60 pb-100 bg-bg1'>{children}</div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Layout;
