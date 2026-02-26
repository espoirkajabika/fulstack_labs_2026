import { useState } from 'react';
import { Link } from 'react-router-dom';


interface NavProps {
  onSearch: (query: string) => void;
}

const Nav: React.FC<NavProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="logo-container">
      <img src="https://itsm-ace.ca/images/logo.svg" alt="Pixell River Logo" />
      
      <div className="search-bar">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      
        <ul id="nav-menu">
            <li><Link to="/directory">Directory</Link></li>
            <li><Link to="/organization">Organization</Link></li>
        </ul>

    </nav>
  );
};

export default Nav;
