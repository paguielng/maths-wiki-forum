import React, { useState } from 'react';
import LaTeXRenderer from './LaTeXRenderer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TheoremCardProps {
  title: string;
  statement: string;
  proof?: string;
  applications?: string[];
  year?: string;
  author?: string;
}

const TheoremCard: React.FC<TheoremCardProps> = ({
  title,
  statement,
  proof,
  applications,
  year,
  author,
}) => {
  const [isProofOpen, setIsProofOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
          {year && author && (
            <div className="text-sm text-gray-500">
              {year}, {author}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <LaTeXRenderer formula={statement} block />
        </div>
        
        {applications && applications.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Applications :</p>
            <ul className="list-disc list-inside text-gray-600 pl-2 space-y-1">
              {applications.map((application, index) => (
                <li key={index}>{application}</li>
              ))}
            </ul>
          </div>
        )}
        
        {proof && (
          <div>
            <button
              onClick={() => setIsProofOpen(!isProofOpen)}
              className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition mt-2 text-sm font-medium"
            >
              {isProofOpen ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Masquer la démonstration
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Voir la démonstration
                </>
              )}
            </button>
            
            {isProofOpen && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100 animate-fadeIn">
                <p className="text-sm font-medium text-gray-700 mb-2">Démonstration :</p>
                <LaTeXRenderer formula={proof} block />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoremCard;