import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Layout } from './components/Layout';
import { NewEmployee } from './pages/NewEmployee';
import { EditEmployee } from './pages/EditEmployee';
import { DeleteEmployee } from './pages/DeleteEmployee';
import { ImportExcel } from './pages/ImportExcel';
import { ExportExcel } from './pages/ExportExcel';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="employees/new" element={<NewEmployee />} />
          <Route path="employees/edit" element={<EditEmployee />} />
          <Route path="employees/delete" element={<DeleteEmployee />} />
          <Route path="import" element={<ImportExcel />} />
          <Route path="export" element={<ExportExcel />} />
          <Route index element={<Navigate to="/employees/new" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;