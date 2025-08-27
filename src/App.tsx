import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import VendedorDashboard from "./pages/VendedorDashboard";
import Clients from "./pages/Clients";
import Geographic from "./pages/Geographic";
import Reports from "./pages/Reports";
import Goals from "./pages/Goals";
import Performance from "./pages/Performance";
import CommercialProposal from "./pages/CommercialProposal";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();
  
  console.log('AppRoutes render - user:', user, 'isAuthenticated:', isAuthenticated);
  
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? (
          <Navigate to={user?.role === 'vendedor' ? '/vendedor' : '/dashboard'} replace />
        ) : (
          <Login />
        )
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Navigate to={user?.role === 'vendedor' ? '/vendedor' : '/dashboard'} replace />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="planejamento">
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/vendedor" element={
        <ProtectedRoute requiredRole="vendedor">
          <Layout>
            <VendedorDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/clients" element={
        <ProtectedRoute>
          <Layout>
            <Clients />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/geographic" element={
        <ProtectedRoute requiredRole="planejamento">
          <Layout>
            <Geographic />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <Layout>
            <Reports />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/goals" element={
        <ProtectedRoute requiredRole="planejamento">
          <Layout>
            <Goals />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/performance" element={
        <ProtectedRoute>
          <Layout>
            <Performance />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/proposals" element={
        <ProtectedRoute>
          <Layout>
            <CommercialProposal />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
