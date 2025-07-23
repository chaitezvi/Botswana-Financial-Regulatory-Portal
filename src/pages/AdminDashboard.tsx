import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export function AdminDashboard() {
  const location = useLocation();
  const { documents, faqs, addDocument, updateDocument, deleteDocument, addFAQ, updateFAQ, deleteFAQ, logAction } = useData();
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const [showAddDocument, setShowAddDocument] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);

  const sidebarItems = [
    { path: '/admin', label: 'Overview', icon: BarChart3 },
    { path: '/admin/documents', label: 'Documents', icon: FileText },
    { path: '/admin/faqs', label: 'FAQs', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  const handleAddDocument = (formData: any) => {
    addDocument(formData);
    logAction(user!.id, user!.name, 'CREATE', 'Document', `Created document: ${formData.title}`);
    addNotification('success', 'Document added successfully');
    setShowAddDocument(false);
  };

  const handleUpdateDocument = (id: string, formData: any) => {
    updateDocument(id, formData);
    logAction(user!.id, user!.name, 'UPDATE', 'Document', `Updated document: ${formData.title}`);
    addNotification('success', 'Document updated successfully');
    setEditingDocument(null);
  };

  const handleDeleteDocument = (id: string, title: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
      logAction(user!.id, user!.name, 'DELETE', 'Document', `Deleted document: ${title}`);
      addNotification('success', 'Document deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-sm text-gray-600">Content Management</p>
          </div>
          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/documents" element={
              <DocumentManagement 
                documents={documents}
                onAdd={handleAddDocument}
                onUpdate={handleUpdateDocument}
                onDelete={handleDeleteDocument}
                showAddForm={showAddDocument}
                setShowAddForm={setShowAddDocument}
                editingDocument={editingDocument}
                setEditingDocument={setEditingDocument}
              />
            } />
            <Route path="/faqs" element={
              <FAQManagement 
                faqs={faqs}
                onAdd={addFAQ}
                onUpdate={updateFAQ}
                onDelete={deleteFAQ}
                showAddForm={showAddFAQ}
                setShowAddForm={setShowAddFAQ}
                editingFAQ={editingFAQ}
                setEditingFAQ={setEditingFAQ}
              />
            } />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AdminOverview() {
  const { documents, faqs } = useData();

  const stats = [
    { label: 'Total Documents', value: documents.length, color: 'text-blue-600' },
    { label: 'Total FAQs', value: faqs.length, color: 'text-green-600' },
    { label: 'Active Users', value: '156', color: 'text-purple-600' },
    { label: 'Monthly Searches', value: '2,847', color: 'text-orange-600' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
          <div className="space-y-3">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{doc.title}</div>
                  <div className="text-sm text-gray-600">{doc.authority}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(doc.lastModified).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Documents uploaded today</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">User searches today</span>
              <span className="font-medium">127</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">FAQ queries today</span>
              <span className="font-medium">45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentManagement({ documents, onAdd, onUpdate, onDelete, showAddForm, setShowAddForm, editingDocument, setEditingDocument }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredDocuments = documents.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="act">Acts</option>
              <option value="regulation">Regulations</option>
              <option value="policy">Policies</option>
              <option value="guideline">Guidelines</option>
              <option value="directive">Directives</option>
              <option value="form">Forms</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Authority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc: any) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                    <div className="text-sm text-gray-500">{doc.description.substring(0, 100)}...</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.authority}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(doc.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingDocument(doc)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id, doc.title)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddForm || editingDocument) && (
        <DocumentForm
          document={editingDocument}
          onSubmit={editingDocument ? 
            (data: any) => onUpdate(editingDocument.id, data) : 
            onAdd
          }
          onCancel={() => {
            setShowAddForm(false);
            setEditingDocument(null);
          }}
        />
      )}
    </div>
  );
}

function DocumentForm({ document, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: document?.title || '',
    type: document?.type || 'act',
    category: document?.category || 'banking',
    authority: document?.authority || 'BoB',
    description: document?.description || '',
    content: document?.content || '',
    tags: document?.tags?.join(', ') || '',
    requirements: document?.requirements?.join('\n') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      requirements: formData.requirements.split('\n').map(req => req.trim()).filter(Boolean)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {document ? 'Edit Document' : 'Add New Document'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="act">Act</option>
                <option value="regulation">Regulation</option>
                <option value="policy">Policy</option>
                <option value="guideline">Guideline</option>
                <option value="directive">Directive</option>
                <option value="form">Form</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="banking">Banking</option>
                <option value="insurance">Insurance</option>
                <option value="asset-management">Asset Management</option>
                <option value="microlending">Microlending</option>
                <option value="payment-systems">Payment Systems</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Authority</label>
              <select
                value={formData.authority}
                onChange={(e) => setFormData({...formData, authority: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BoB">Bank of Botswana</option>
                <option value="NBFIRA">NBFIRA</option>
                <option value="FIA">Financial Intelligence Agency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="banking, licensing, regulation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Minimum capital requirement&#10;Fit and proper persons&#10;Adequate internal controls"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {document ? 'Update' : 'Add'} Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FAQManagement({ faqs, onAdd, onUpdate, onDelete, showAddForm, setShowAddForm, editingFAQ, setEditingFAQ }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {faqs.map((faq: any) => (
            <div key={faq.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 mb-2">{faq.answer}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Category: {faq.category}</span>
                    <span>Authority: {faq.authority}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setEditingFAQ(faq)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this FAQ?')) {
                        onDelete(faq.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(showAddForm || editingFAQ) && (
        <FAQForm
          faq={editingFAQ}
          onSubmit={editingFAQ ? 
            (data: any) => onUpdate(editingFAQ.id, data) : 
            onAdd
          }
          onCancel={() => {
            setShowAddForm(false);
            setEditingFAQ(null);
          }}
        />
      )}
    </div>
  );
}

function FAQForm({ faq, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'banking',
    authority: faq?.authority || 'BoB'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {faq ? 'Edit FAQ' : 'Add New FAQ'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({...formData, answer: e.target.value})}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="banking">Banking</option>
                <option value="insurance">Insurance</option>
                <option value="asset-management">Asset Management</option>
                <option value="microlending">Microlending</option>
                <option value="payment-systems">Payment Systems</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Authority</label>
              <select
                value={formData.authority}
                onChange={(e) => setFormData({...formData, authority: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BoB">Bank of Botswana</option>
                <option value="NBFIRA">NBFIRA</option>
                <option value="FIA">Financial Intelligence Agency</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {faq ? 'Update' : 'Add'} FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
            <input
              type="text"
              defaultValue="FinRegHub - Botswana Financial Services Portal"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              defaultValue="info@finreghub.gov.bw"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Mode</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}