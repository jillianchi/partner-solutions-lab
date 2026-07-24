import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NavPage } from '../config/navigation';

interface PageNavProps {
  prevPage?: NavPage;
  nextPage?: NavPage;
}

export default function PageNav({ prevPage, nextPage }: PageNavProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6" style={{ borderTop: '1px solid #E6EBF1' }}>
      {prevPage ? (
        <Link
          to={prevPage.path}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            border: '1px solid #E6EBF1',
            color: '#425466',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#635BFF';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = '#635BFF';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#425466';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E6EBF1';
          }}
        >
          <ArrowLeft size={16} />
          <div className="text-left">
            <div className="text-xs mb-0.5" style={{ color: '#425466' }}>Previous</div>
            <div className="text-sm font-medium">{prevPage.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Link
          to={nextPage.path}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: '#635BFF',
            color: '#fff',
            textDecoration: 'none',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#5248E8')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#635BFF')}
        >
          <div className="text-right">
            <div className="text-xs opacity-75 mb-0.5">Next</div>
            <div className="text-sm font-medium">{nextPage.label}</div>
          </div>
          <ArrowRight size={16} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
