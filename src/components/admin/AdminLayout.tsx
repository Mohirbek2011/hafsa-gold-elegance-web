
import React, { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-gold" />
            <h1 className="text-xl font-serif">Hafsa Gold | Админ</h1>
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="bg-black text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Hafsa Gold - Панель Администратора</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
