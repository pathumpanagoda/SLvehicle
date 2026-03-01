import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';

// Pages
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import ComparisonPage from './pages/ComparisonPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
      {!isAuthPage && <CompareBar />}
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <CompareProvider>
        <Router>
          <AppContent />
        </Router>
      </CompareProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
