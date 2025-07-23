import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, Building2, Tag, FileText } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const { documents } = useData();
  
  const document = documents.find(doc => doc.id === id);

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Document not found</h1>
            <Link to="/search" className="text-blue-600 hover:text-blue-800">
              ← Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/search" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-gray-600" />
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(document.type)}`}>
                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                  </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getAuthorityColor(document.authority)}`}>
                    {document.authority}
                  </span>
                </div>
              </div>
              {document.downloadUrl && (
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{document.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Published: {new Date(document.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last Modified: {new Date(document.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span className="capitalize">{document.category.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {document.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">{document.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Content</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {document.content}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Requirements */}
            {document.requirements && document.requirements.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Requirements</h3>
                <ul className="space-y-3">
                  {document.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/checklist?category=${document.category}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md transition-colors"
                >
                  Generate Compliance Checklist
                </Link>
                <Link
                  to="/faq"
                  className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 text-center px-4 py-2 rounded-md transition-colors"
                >
                  View Related FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}