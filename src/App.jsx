import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseBrowser from './pages/CourseBrowser';
import Timetable from './pages/Timetable';
import BiddingOptimizer from './pages/BiddingOptimizer';
import PrerequisiteVisualizer from './pages/PrerequisiteVisualizer';
import AssessmentTimeline from './pages/AssessmentTimeline';
import CareerPathway from './pages/CareerPathway';
import AIRecommender from './pages/AIRecommender';
import ErrorBoundary from './components/ErrorBoundary';
import { courses, studentCart as initialCart } from './data/mockData';
import { getUser, removeUser, getCart, saveCart } from './utils/storageUtils';

function App() {
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check for saved user session and cart
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }

    const savedCart = getCart();
    if (savedCart && savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []);

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    removeUser();
    setUser(null);
  };

  const addToCart = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course && !cart.find(c => c.id === courseId)) {
      const newCart = [...cart, course];
      setCart(newCart);
      saveCart(newCart);
    }
  };

  const removeFromCart = (courseId) => {
    const newCart = cart.filter(c => c.id !== courseId);
    setCart(newCart);
    saveCart(newCart);
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <ErrorBoundary fallbackMessage="We're experiencing technical difficulties. Please refresh the page or try again later.">
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />

          {/* Protected Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Sidebar
                cart={cart}
                user={user}
                onLogout={handleLogout}
                onCollapseChange={handleSidebarCollapseChange}
                isCollapsed={sidebarCollapsed}
              />
              <main className={`transition-all duration-300 pb-8 min-h-screen ${
                sidebarCollapsed ? 'ml-0 md:ml-24' : 'ml-0 md:ml-80'
              }`}>
                <Routes>
                  <Route path="/" element={<Dashboard cart={cart} removeFromCart={removeFromCart} />} />
                  <Route path="/courses" element={<CourseBrowser cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
                  <Route path="/timetable" element={<Timetable cart={cart} />} />
                  <Route path="/bidding" element={<BiddingOptimizer cart={cart} />} />
                  <Route path="/prerequisites" element={<PrerequisiteVisualizer />} />
                  <Route path="/assessments" element={<AssessmentTimeline cart={cart} />} />
                  <Route path="/career" element={<CareerPathway cart={cart} />} />
                  <Route path="/ai-recommender" element={<AIRecommender cart={cart} addToCart={addToCart} />} />
                </Routes>
              </main>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
