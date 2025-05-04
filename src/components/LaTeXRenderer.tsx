import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXRendererProps {
  formula: string;
  block?: boolean;
  className?: string;
}

const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ formula, block = false, className = '' }) => {
  try {
    if (block) {
      return (
        <div className={`my-4 overflow-x-auto ${className}`}>
          <BlockMath math={formula} />
        </div>
      );
    }
    return <InlineMath math={formula} className={className} />;
  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return <span className="text-red-500">{formula}</span>;
  }
};

export default LaTeXRenderer;