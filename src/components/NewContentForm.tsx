import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const NewContentForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [references, setReferences] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const categories = ['Théorème', 'Définition', 'Exemple', 'Problème', 'Application', 'Autre'];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form to an API
    console.log({ title, content, category, tags, references });
    setFormSubmitted(true);
    
    // Reset form in a real app after successful submission
    setTimeout(() => {
      setTitle('');
      setContent('');
      setCategory('');
      setTags([]);
      setReferences('');
      setFormSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Proposer un nouveau contenu</h3>
      
      {formSubmitted ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 animate-fadeIn">
          <p className="text-green-700">
            Merci pour votre contribution ! Votre proposition sera examinée par notre équipe éditoriale.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Titre de votre contribution"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Contenu*
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rédigez votre contenu ici. Vous pouvez utiliser la syntaxe LaTeX pour les formules mathématiques : $e^{i\pi} + 1 = 0$"
            />
            <p className="text-xs text-gray-500 mt-1">
              Astuce : Utilisez $...$ pour les formules en ligne et $$...$$ pour les formules en bloc.
            </p>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Mots-clés
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-l-md"
                placeholder="Ajouter un mot-clé"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-50 text-blue-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-1">
              Références
            </label>
            <textarea
              id="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ajoutez vos références bibliographiques ici"
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Soumettre la proposition
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewContentForm;