import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const domains = [
    { name: 'Analyse', path: '/' },
    { name: 'Algèbre', path: '/algebre' },
    { name: 'Géométrie', path: '/geometrie' },
    { name: 'Probabilités', path: '/probabilites' },
    { name: 'Théorie des nombres', path: '/theorie-nombres' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-900" />
            <span className="text-xl font-semibold text-blue-900">Wiki Mathématique</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {domains.map(domain => (
              <Link 
                key={domain.path} 
                to={domain.path}
                className={`text-blue-800 hover:text-blue-600 font-medium transition ${
                  domain.path === '/' ? 'underline underline-offset-4 decoration-2 decoration-pink-700' : ''
                }`}
              >
                {domain.name}
              </Link>
            ))}
            <button className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition">
              <Search className="h-4 w-4" />
              <span>Rechercher</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-blue-900" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 animate-fadeIn">
            {domains.map(domain => (
              <Link 
                key={domain.path} 
                to={domain.path}
                className={`text-blue-800 hover:text-blue-600 font-medium transition ${
                  domain.path === '/' ? 'font-semibold text-blue-900' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {domain.name}
              </Link>
            ))}
            <button className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition">
              <Search className="h-4 w-4" />
              <span>Rechercher</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;