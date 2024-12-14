import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Users, FileSpreadsheet, Settings, PlusCircle, RefreshCcw, Trash2, FileDown, FileUp } from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">STELLAR - USD Maaş Hesaplama</h1>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{user.username} ({user.branch})</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={18} />
                  Çıkış
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-[250px_1fr] gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-2">
              <Link
                to="/employees/new"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <PlusCircle size={18} />
                Veri Girişi
              </Link>
              <Link
                to="/employees/edit"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <RefreshCcw size={18} />
                Veri Güncelle
              </Link>
              <Link
                to="/employees/delete"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <Trash2 size={18} />
                Sil
              </Link>
              <Link
                to="/reports"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <FileSpreadsheet size={18} />
                Raporlar
              </Link>
              <Link
                to="/import"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <FileUp size={18} />
                Excel'den İçe Aktar
              </Link>
              <Link
                to="/export"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <FileDown size={18} />
                Excel'e Kaydet
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/settings"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  <Settings size={18} />
                  Ayarlar
                </Link>
              )}
            </nav>
          </div>
          <main className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}