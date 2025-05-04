import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import LaTeXRenderer from '../components/LaTeXRenderer';
import TheoremCard from '../components/TheoremCard';
import InteractiveGrapher from '../components/InteractiveGrapher';
import Publication from '../components/Publication';
import PublicationsList from '../components/PublicationsList';
import Comments from '../components/Comments';
import NewContentForm from '../components/NewContentForm';
import { analyseIntroduction, analyseTheorems, publications, comments } from '../data/analyseData';

const AnalysePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:flex gap-8">
        {/* Sidebar navigation */}
        <div className="lg:w-1/4 mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">Sommaire</h2>
            <nav>
              <ul className="space-y-2">
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'theoremes', label: 'Théorèmes fondamentaux' },
                  { id: 'outils', label: 'Outils interactifs' },
                  { id: 'publications', label: 'Publications' },
                  { id: 'discussion', label: 'Discussion' },
                  { id: 'contributions', label: 'Proposer un contenu' }
                ].map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="bg-gradient-to-r from-blue-900 to-pink-800 text-white p-6 rounded-lg mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Analyse Mathématique</h1>
            <p className="text-blue-100 mb-3">
              Exploration des concepts fondamentaux, théorèmes et applications de l'analyse mathématique.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => scrollToSection('theoremes')}
                className="px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-blue-50 transition text-sm font-medium"
              >
                Voir les théorèmes
              </button>
              <button 
                onClick={() => scrollToSection('outils')}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
              >
                Explorer les outils
              </button>
            </div>
          </div>

          {/* Introduction section */}
          <section id="introduction" className="mb-12 scroll-mt-24">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Introduction à l'Analyse</h2>
              <div className="prose prose-blue max-w-none">
                {analyseIntroduction.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-blue-800 font-medium mb-2">Pourquoi l'analyse est-elle importante ?</p>
              <p className="text-blue-700">
                L'analyse fournit les fondements des mathématiques modernes et permet la modélisation précise de nombreux phénomènes naturels et sociaux. De la physique à l'économie, en passant par la biologie et l'informatique, les outils analytiques sont indispensables pour comprendre et prédire des comportements complexes.
              </p>
            </div>
          </section>

          {/* Theorems section */}
          <section id="theoremes" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Théorèmes fondamentaux</h2>
            <div className="space-y-6">
              {analyseTheorems.map((theorem, index) => (
                <TheoremCard
                  key={index}
                  title={theorem.title}
                  statement={theorem.statement}
                  proof={theorem.proof}
                  applications={theorem.applications}
                  year={theorem.year}
                  author={theorem.author}
                />
              ))}
            </div>
          </section>

          {/* Interactive tools section */}
          <section id="outils" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Outils interactifs</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-blue-800 mb-3">Grapheur de fonctions</h3>
              <p className="text-gray-700 mb-4">
                Utilisez cet outil pour visualiser des fonctions mathématiques et explorer leur comportement.
                Essayez les fonctions trigonométriques, exponentielles, ou créez vos propres expressions.
              </p>
              <InteractiveGrapher 
                functionStr="Math.sin(x)" 
                width={800} 
                height={400}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-800 mb-3">Calcul symbolique</h3>
              <p className="text-gray-700 mb-4">
                Cette calculatrice symbolique permet de calculer des dérivées, intégrales et limites.
                Pour l'utiliser, entrez une expression mathématique dans le champ ci-dessous.
              </p>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <div className="flex gap-3 mb-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-md">
                    <option>Dérivée</option>
                    <option>Intégrale</option>
                    <option>Limite</option>
                    <option>Développement de Taylor</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="f(x) = x^2 * sin(x)" 
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Calculer
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-500 text-sm">Résultat:</p>
                  <div className="mt-2">
                    <LaTeXRenderer formula="f'(x) = 2x \cdot \sin(x) + x^2 \cdot \cos(x)" block />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Publications section */}
          <section id="publications" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Publications récentes</h2>
            <PublicationsList publications={publications} />
          </section>

          {/* Discussion section */}
          <section id="discussion" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Discussion</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Comments comments={comments} />
            </div>
          </section>

          {/* Contribute section */}
          <section id="contributions" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Proposer un nouveau contenu</h2>
            <NewContentForm />
          </section>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
          aria-label="Retourner en haut"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default AnalysePage;