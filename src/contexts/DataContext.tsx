import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Document {
  id: string;
  title: string;
  type: 'act' | 'regulation' | 'policy' | 'guideline' | 'directive' | 'form';
  category: 'banking' | 'insurance' | 'asset-management' | 'microlending' | 'payment-systems' | 'general';
  authority: 'BoB' | 'NBFIRA' | 'FIA';
  description: string;
  content: string;
  downloadUrl?: string;
  publishedDate: string;
  lastModified: string;
  tags: string[];
  requirements?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  authority: string;
}

export interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  details: string;
}

interface DataContextType {
  documents: Document[];
  faqs: FAQ[];
  auditLog: AuditEntry[];
  addDocument: (doc: Omit<Document, 'id' | 'publishedDate' | 'lastModified'>) => void;
  updateDocument: (id: string, doc: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  searchDocuments: (query: string, filters?: any) => Document[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  logAction: (userId: string, userName: string, action: string, resource: string, details: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  useEffect(() => {
    // Initialize with sample data
    const sampleDocuments: Document[] = [
      {
        id: '1',
        title: 'Banking Act',
        type: 'act',
        category: 'banking',
        authority: 'BoB',
        description: 'The primary legislation governing banking operations in Botswana',
        content: 'This Act provides for the licensing and regulation of banking business...',
        publishedDate: '2023-01-15',
        lastModified: '2024-01-15',
        tags: ['banking', 'licensing', 'regulation'],
        requirements: [
          'Minimum capital requirement of P10 million',
          'Fit and proper persons as directors',
          'Adequate internal controls and risk management',
          'Compliance with prudential requirements'
        ]
      },
      {
        id: '2',
        title: 'Insurance Industry Act',
        type: 'act',
        category: 'insurance',
        authority: 'NBFIRA',
        description: 'Comprehensive legislation for insurance companies and intermediaries',
        content: 'This Act regulates the conduct of insurance business in Botswana...',
        publishedDate: '2023-02-20',
        lastModified: '2024-02-20',
        tags: ['insurance', 'intermediaries', 'solvency'],
        requirements: [
          'Minimum solvency capital requirement',
          'Professional indemnity insurance',
          'Qualified actuarial services',
          'Regular financial reporting'
        ]
      },
      {
        id: '3',
        title: 'Anti-Money Laundering Guidelines',
        type: 'guideline',
        category: 'general',
        authority: 'FIA',
        description: 'Guidelines for preventing money laundering and terrorist financing',
        content: 'These guidelines outline the requirements for AML/CFT compliance...',
        publishedDate: '2023-03-10',
        lastModified: '2024-03-10',
        tags: ['AML', 'compliance', 'reporting'],
        requirements: [
          'Customer due diligence procedures',
          'Suspicious transaction reporting',
          'Record keeping requirements',
          'Staff training programs'
        ]
      }
    ];

    const sampleFAQs: FAQ[] = [
      {
        id: '1',
        question: 'What are the minimum capital requirements for starting a bank?',
        answer: 'The minimum capital requirement for starting a commercial bank in Botswana is P10 million as stipulated in the Banking Act.',
        category: 'banking',
        authority: 'BoB'
      },
      {
        id: '2',
        question: 'How long does the insurance license application process take?',
        answer: 'The insurance license application process typically takes 90-120 days from the date of receipt of a complete application.',
        category: 'insurance',
        authority: 'NBFIRA'
      }
    ];

    if (!localStorage.getItem('documents')) {
      localStorage.setItem('documents', JSON.stringify(sampleDocuments));
    }
    if (!localStorage.getItem('faqs')) {
      localStorage.setItem('faqs', JSON.stringify(sampleFAQs));
    }

    setDocuments(JSON.parse(localStorage.getItem('documents') || '[]'));
    setFaqs(JSON.parse(localStorage.getItem('faqs') || '[]'));
    setAuditLog(JSON.parse(localStorage.getItem('auditLog') || '[]'));
  }, []);

  const addDocument = (doc: Omit<Document, 'id' | 'publishedDate' | 'lastModified'>) => {
    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      publishedDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
  };

  const updateDocument = (id: string, doc: Partial<Document>) => {
    const updatedDocs = documents.map(d => 
      d.id === id ? { ...d, ...doc, lastModified: new Date().toISOString().split('T')[0] } : d
    );
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
  };

  const deleteDocument = (id: string) => {
    const updatedDocs = documents.filter(d => d.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
  };

  const searchDocuments = (query: string, filters?: any): Document[] => {
    return documents.filter(doc => {
      const matchesQuery = query === '' || 
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.description.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesFilters = !filters || Object.keys(filters).every(key => {
        if (!filters[key] || filters[key] === 'all') return true;
        return doc[key as keyof Document] === filters[key];
      });

      return matchesQuery && matchesFilters;
    });
  };

  const addFAQ = (faq: Omit<FAQ, 'id'>) => {
    const newFAQ: FAQ = { ...faq, id: Date.now().toString() };
    const updatedFAQs = [...faqs, newFAQ];
    setFaqs(updatedFAQs);
    localStorage.setItem('faqs', JSON.stringify(updatedFAQs));
  };

  const updateFAQ = (id: string, faq: Partial<FAQ>) => {
    const updatedFAQs = faqs.map(f => f.id === id ? { ...f, ...faq } : f);
    setFaqs(updatedFAQs);
    localStorage.setItem('faqs', JSON.stringify(updatedFAQs));
  };

  const deleteFAQ = (id: string) => {
    const updatedFAQs = faqs.filter(f => f.id !== id);
    setFaqs(updatedFAQs);
    localStorage.setItem('faqs', JSON.stringify(updatedFAQs));
  };

  const logAction = (userId: string, userName: string, action: string, resource: string, details: string) => {
    const newEntry: AuditEntry = {
      id: Date.now().toString(),
      userId,
      userName,
      action,
      resource,
      timestamp: new Date().toISOString(),
      details
    };
    const updatedLog = [newEntry, ...auditLog];
    setAuditLog(updatedLog);
    localStorage.setItem('auditLog', JSON.stringify(updatedLog));
  };

  return (
    <DataContext.Provider value={{
      documents,
      faqs,
      auditLog,
      addDocument,
      updateDocument,
      deleteDocument,
      searchDocuments,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      logAction
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}