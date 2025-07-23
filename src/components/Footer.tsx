import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">FinRegHub</h3>
                <p className="text-sm text-gray-400">Botswana Financial Services Portal</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Simplifying compliance with intelligent search across Botswana's financial regulatory landscape. 
              Connect, collaborate, and innovate with centralized access to regulatory information.
            </p>
          </div>

          {/* Regulatory Bodies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Regulatory Bodies</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Bank of Botswana (BoB)</li>
              <li>NBFIRA</li>
              <li>Financial Intelligence Agency</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@finreghub.gov.bw</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+267 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Gaborone, Botswana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Government of Botswana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}