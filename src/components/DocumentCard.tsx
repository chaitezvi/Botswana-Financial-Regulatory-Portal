import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, Tag, Building2 } from 'lucide-react';
import { Document } from '../contexts/DataContext';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getAuthorityColor = (authority: string) => {
    switch (authority) {
      case 'BoB': return 'bg-blue-100 text-blue-800';
      case 'NBFIRA': return 'bg-green-100 text-green-800';
      case 'FIA': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'act': return 'bg-red-100 text-red-800';
      case 'regulation': return 'bg-orange-100 text-orange-800';
      case 'policy': return 'bg-yellow-100 text-yellow-800';
      case 'guideline': return 'bg-indigo-100 text-indigo-800';
      case 'directive': return 'bg-pink-100 text-pink-800';
      case 'form': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(document.type)}`}>
              {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthorityColor(document.authority)}`}>
            {document.authority}
          </span>
        </div>

        <Link to={`/document/${document.id}`} className="block group">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {document.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {document.description}
        </p>

        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Published: {new Date(document.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Building2 className="w-3 h-3" />
            <span className="capitalize">{document.category.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {document.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {document.tags.length > 3 && (
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              +{document.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/document/${document.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            View Details
          </Link>
          {document.downloadUrl && (
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}