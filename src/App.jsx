import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { courses, studentCart as initialCart } from './data/mockData';

function App() {
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(null);

  // Check for saved user session
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const addToCart = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course && !cart.find(c => c.id === courseId)) {
      setCart([...cart, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(c => c.id !== courseId));
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />

        {/* Protected Routes */}
        <Route path="/*" element={
          <ProtectedRoute>
            <Sidebar cart={cart} user={user} onLogout={handleLogout} />
            <main className="ml-64 transition-all duration-300 pb-8">
              <Routes>
                <Route path="/" element={<Dashboard cart={cart} />} />
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
  );
}

export default App;
