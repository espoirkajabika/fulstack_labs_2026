import { ReactNode } from 'react';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';

interface PageProps {
  children: ReactNode;
  onSearch: (query: string) => void;
}

const Page: React.FC<PageProps> = ({ children, onSearch }) => {
  return (
    <>
      <Nav onSearch={onSearch} />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Page;
