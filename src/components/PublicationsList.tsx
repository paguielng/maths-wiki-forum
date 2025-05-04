import React, { useState } from 'react';
import Publication, { PublicationData } from './Publication';
import { Search, Filter } from 'lucide-react';

interface PublicationsListProps {
  publications: PublicationData[];
}

const PublicationsList: React.FC<PublicationsListProps> = ({ publications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleFilters, setVisibleFilters] = useState(false);

  // Get all unique tags from publications
  const allTags = [...new Set(publications.flatMap(pub => pub.tags))].sort();

  // Filter publications based on search term and selected tags
  const filteredPublications = publications.filter(pub => {
    // Check if publication matches search term
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if publication has all selected tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => pub.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une publication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={() => setVisibleFilters(!visibleFilters)}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filtres</span>
          {selectedTags.length > 0 && (
            <span className="bg-blue-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs ml-1">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {visibleFilters && (
        <div className="bg-gray-50 p-4 rounded-md animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Filtrer par étiquettes</h4>
            {selectedTags.length > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Effacer tous les filtres
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded-md text-sm transition ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPublications.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>Aucune publication ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPublications.map(publication => (
            <Publication key={publication.id} publication={publication} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicationsList;