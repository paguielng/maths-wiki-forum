import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

export interface PublicationData {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal?: string;
  abstract: string;
  link?: string;
  tags: string[];
}

interface PublicationProps {
  publication: PublicationData;
}

const Publication: React.FC<PublicationProps> = ({ publication }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full self-start">
          <FileText className="h-5 w-5 text-blue-700" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-blue-900 mb-1">
            {publication.title}
          </h3>
          
          <p className="text-gray-600 mb-2">
            <span className="font-medium">{publication.authors}</span> 
            {publication.journal && <span> • {publication.journal}</span>} 
            <span> • {publication.year}</span>
          </p>
          
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {publication.abstract}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {publication.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {publication.link && (
            <a 
              href={publication.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-pink-700 hover:text-pink-900 transition"
            >
              Accéder à la publication <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publication;