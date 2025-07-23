import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Users, Shield, TrendingUp, CheckSquare, MessageCircle, Brain } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { useData } from '../contexts/DataContext';

export function HomePage() {
  const navigate = useNavigate();
  const { documents } = useData();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const stats = [
    { icon: FileText, label: 'Total Documents', value: documents.length.toString(), color: 'text-blue-600' },
    { icon: Users, label: 'Regulatory Bodies', value: '3', color: 'text-green-600' },
    { icon: Shield, label: 'Categories', value: '6', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Monthly Updates', value: '25+', color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Search across all regulatory documents with intelligent filtering and categorization.',
      link: '/search'
    },
    {
      icon: CheckSquare,
      title: 'Compliance Checklist',
      description: 'Generate customized checklists based on your business requirements and regulatory obligations.',
      link: '/checklist'
    },
    {
      icon: Brain,
      title: 'AI Compliance Assistant',
      description: 'Get intelligent insights, risk assessments, and personalized recommendations powered by AI.',
      link: '/ai-assistant'
    },
    {
      icon: MessageCircle,
      title: 'FAQ & Support',
      description: 'Get instant answers to common questions with our intelligent chatbot system.',
      link: '/faq'
    }
  ];

  const authorities = [
    {
      name: 'Bank of Botswana',
      abbr: 'BoB',
      description: 'Central bank regulating monetary policy and banking institutions',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'NBFIRA',
      abbr: 'NBFIRA',
      description: 'Non-Bank Financial Institutions Regulatory Authority',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Financial Intelligence Agency',
      abbr: 'FIA',
      description: 'Anti-money laundering and terrorist financing oversight',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect. Collaborate. <span className="text-blue-200">Innovate.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Simplifying Compliance with Intelligent Search across Botswana's Financial Services Regulatory Landscape
            </p>
            <SearchBar 
              onSearch={handleSearch}
              className="max-w-2xl mx-auto"
              placeholder="Search regulations, policies, guidelines..."
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Streamlined Regulatory Access
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate Botswana's financial regulatory environment with ease using our comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a
                  href={feature.link}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Bodies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regulatory Authorities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unified access to information from all major financial regulatory bodies in Botswana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {authorities.map((authority) => (
              <div key={authority.abbr} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{authority.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${authority.color}`}>
                    {authority.abbr}
                  </span>
                </div>
                <p className="text-gray-600">{authority.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Navigate Compliance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start exploring our comprehensive database of regulatory information and generate your compliance checklist today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/search')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Searching
            </button>
            <button
              onClick={() => navigate('/checklist')}
              className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Generate Checklist
            </button>
            <button
              onClick={() => navigate('/ai-assistant')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Try AI Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}