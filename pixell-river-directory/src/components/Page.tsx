import { type ReactNode } from 'react';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';

interface PageProps {
  children: ReactNode;
  onSearch: (query: string) => void;
  title?: string;
  subtitle?: string;
}

const Page: React.FC<PageProps> = ({ children, onSearch, title, subtitle }) => {
  return (
    <>
      <Nav onSearch={onSearch} />
      <Header title={title} subtitle={subtitle} />
      {children}
      <Footer />
    </>
  );
};

export default Page;
