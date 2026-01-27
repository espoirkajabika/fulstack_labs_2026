const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Pixell River Financial</p>
    </footer>
  );
};

export default Footer;
