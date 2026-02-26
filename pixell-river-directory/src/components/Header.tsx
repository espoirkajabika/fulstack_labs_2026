interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Pixell River Financial',
  subtitle = 'Welcome to our company portal.',
}) => {
  return (
    <header>
      <h1>{title}</h1>
      <p className="greeting">{subtitle}</p>
    </header>
  );
};

export default Header;
