import React, { useState } from 'react';
import { Brain, MessageSquare, FileSearch, TrendingUp, AlertTriangle, CheckCircle, Send, Sparkles, BarChart3, Target } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: ComplianceAnalysis;
}

interface ComplianceAnalysis {
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  relevantDocuments: string[];
  complianceScore: number;
  gaps: string[];
}

export function AIComplianceAssistant() {
  const { documents } = useData();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI Compliance Assistant. I can help you analyze regulatory requirements, assess compliance risks, and provide personalized recommendations for your business. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<'general' | 'risk' | 'gap' | 'recommendation'>('general');

  const analysisTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare, description: 'Ask any compliance-related question' },
    { value: 'risk', label: 'Risk Assessment', icon: AlertTriangle, description: 'Analyze compliance risks for your business' },
    { value: 'gap', label: 'Gap Analysis', icon: Target, description: 'Identify compliance gaps and missing requirements' },
    { value: 'recommendation', label: 'Smart Recommendations', icon: Sparkles, description: 'Get AI-powered compliance recommendations' }
  ];

  const mockAIAnalysis = (query: string, type: string): ComplianceAnalysis => {
    // Simulate AI analysis based on query and documents
    const relevantDocs = documents.filter(doc => 
      query.toLowerCase().includes(doc.category) || 
      doc.tags.some(tag => query.toLowerCase().includes(tag.toLowerCase()))
    );

    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let complianceScore = Math.floor(Math.random() * 40) + 60; // 60-100
    
    if (query.toLowerCase().includes('banking')) {
      riskLevel = 'high';
      complianceScore = Math.floor(Math.random() * 20) + 70;
    } else if (query.toLowerCase().includes('insurance')) {
      riskLevel = 'medium';
      complianceScore = Math.floor(Math.random() * 30) + 65;
    }

    const recommendations = [
      'Ensure all licensing requirements are met before operations begin',
      'Implement robust AML/CFT compliance procedures',
      'Establish regular compliance monitoring and reporting systems',
      'Maintain adequate capital reserves as per regulatory requirements',
      'Conduct regular staff training on regulatory compliance'
    ];

    const gaps = [
      'Missing customer due diligence procedures documentation',
      'Incomplete risk management framework',
      'Outdated compliance policies requiring review'
    ];

    return {
      riskLevel,
      recommendations: recommendations.slice(0, 3),
      relevantDocuments: relevantDocs.slice(0, 3).map(doc => doc.title),
      complianceScore,
      gaps: gaps.slice(0, 2)
    };
  };

  const generateAIResponse = (query: string, type: string): string => {
    const responses = {
      general: [
        `Based on your inquiry about "${query}", I've analyzed the relevant regulatory frameworks. Here's what you need to know:`,
        `I've reviewed the applicable regulations for your query. Let me provide you with comprehensive guidance:`,
        `Your question about "${query}" touches on several important compliance areas. Here's my analysis:`
      ],
      risk: [
        `I've conducted a risk assessment for your "${query}" inquiry. Here are the key risk factors to consider:`,
        `Based on current regulatory requirements, I've identified several risk areas related to "${query}":`,
        `My risk analysis for "${query}" reveals the following compliance considerations:`
      ],
      gap: [
        `I've performed a gap analysis for "${query}" and identified areas that need attention:`,
        `Based on best practices and regulatory requirements, here are the compliance gaps I've identified:`,
        `My analysis reveals several areas where your "${query}" compliance framework could be strengthened:`
      ],
      recommendation: [
        `Based on my analysis of "${query}", here are my smart recommendations for optimal compliance:`,
        `I've generated personalized recommendations for your "${query}" compliance strategy:`,
        `To enhance your compliance posture for "${query}", I recommend the following actions:`
      ]
    };

    return responses[type as keyof typeof responses][Math.floor(Math.random() * 3)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAnalyzing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const analysis = mockAIAnalysis(inputMessage, selectedAnalysisType);
      const aiResponse = generateAIResponse(inputMessage, selectedAnalysisType);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        analysis
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsAnalyzing(false);
      addNotification('success', 'AI analysis completed');
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Compliance Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get intelligent insights, risk assessments, and personalized recommendations powered by advanced AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Analysis Type Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Type</h3>
              <div className="space-y-3">
                {analysisTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedAnalysisType(type.value as any)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedAnalysisType === type.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Your Compliance Overview</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Risk Level</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Analysis</span>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs opacity-75 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      {/* AI Analysis Results */}
                      {message.analysis && (
                        <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-3">
                              <BarChart3 className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">Compliance Score</div>
                                <div className={`text-lg font-bold ${getScoreColor(message.analysis.complianceScore)}`}>
                                  {message.analysis.complianceScore}%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">Risk Level</div>
                                <span className={`text-sm px-2 py-1 rounded-full ${getRiskColor(message.analysis.riskLevel)}`}>
                                  {message.analysis.riskLevel.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                                Recommendations
                              </h4>
                              <ul className="space-y-1">
                                {message.analysis.recommendations.map((rec, index) => (
                                  <li key={index} className="text-sm text-gray-700 flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {message.analysis.gaps.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                  <Target className="w-4 h-4 mr-2 text-red-600" />
                                  Compliance Gaps
                                </h4>
                                <ul className="space-y-1">
                                  {message.analysis.gaps.map((gap, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                      <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {gap}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {message.analysis.relevantDocuments.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                  <FileSearch className="w-4 h-4 mr-2 text-blue-600" />
                                  Relevant Documents
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {message.analysis.relevantDocuments.map((doc, index) => (
                                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      {doc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span className="text-sm text-gray-600">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Ask about ${analysisTypes.find(t => t.value === selectedAnalysisType)?.label.toLowerCase()}...`}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isAnalyzing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isAnalyzing}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Try asking: "What are the banking license requirements?" or "Analyze compliance risks for insurance companies"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Analysis</h3>
            <p className="text-gray-600 text-sm">
              Advanced AI algorithms analyze regulatory requirements and provide personalized insights
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Assessment</h3>
            <p className="text-gray-600 text-sm">
              Real-time compliance risk evaluation with actionable recommendations
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600 text-sm">
              Personalized compliance strategies based on your business profile and requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}