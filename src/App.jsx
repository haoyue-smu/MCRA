import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
  const [sessionActive, setSessionActive] = useState(true);
  const [sessionTimer, setSessionTimer] = useState(1800); // 30 minutes

  // Session keep-alive functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionActive && sessionTimer > 0) {
        setSessionTimer(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionActive, sessionTimer]);

  const keepSessionAlive = () => {
    setSessionTimer(1800);
    setSessionActive(true);
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cart={cart} sessionTimer={formatTime(sessionTimer)} onKeepAlive={keepSessionAlive} />

      <main className="pb-8">
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
    </div>
  );
}

export default App;
