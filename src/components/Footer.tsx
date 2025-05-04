import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg font-semibold">Wiki Mathématique</span>
            </Link>
            <p className="text-blue-100 text-sm">
              Une ressource collaborative pour l'exploration et l'apprentissage des mathématiques.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-blue-200 hover:text-white transition" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Domaines</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-200 hover:text-white transition">Analyse</Link></li>
              <li><Link to="/algebre" className="text-blue-200 hover:text-white transition">Algèbre</Link></li>
              <li><Link to="/geometrie" className="text-blue-200 hover:text-white transition">Géométrie</Link></li>
              <li><Link to="/probabilites" className="text-blue-200 hover:text-white transition">Probabilités</Link></li>
              <li><Link to="/theorie-nombres" className="text-blue-200 hover:text-white transition">Théorie des nombres</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition">À propos</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">Comment contribuer</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">Bibliographie</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200 text-sm">
          <p>© {new Date().getFullYear()} Wiki Mathématique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;