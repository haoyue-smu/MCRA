import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, ShoppingCart, Clock,
  Menu, X
} from 'lucide-react';

function Navbar({ cart, sessionTimer, onKeepAlive }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/courses', icon: BookOpen, label: 'Courses' },
    { path: '/timetable', icon: Calendar, label: 'Timetable' },
    { path: '/bidding', icon: TrendingUp, label: 'Bidding' },
    { path: '/prerequisites', icon: GitBranch, label: 'Prerequisites' },
    { path: '/assessments', icon: ClipboardList, label: 'Assessments' },
    { path: '/career', icon: Briefcase, label: 'Career Path' },
    { path: '/ai-recommender', icon: Brain, label: 'AI Recommender' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-smu-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-smu-gold">SCIS</span> Smart Planner
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive(item.path)
                      ? 'bg-smu-gold text-smu-blue'
                      : 'hover:bg-blue-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Cart, Session Timer, Keep Alive */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/courses" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-smu-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded-md">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">{sessionTimer}</span>
            </div>

            <button
              onClick={onKeepAlive}
              className="bg-smu-gold text-smu-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Stay Active
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-blue-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-smu-gold text-smu-blue'
                      : 'hover:bg-blue-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="px-3 py-2 flex items-center justify-between border-t border-blue-700 mt-2 pt-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{sessionTimer}</span>
              </div>
              <button
                onClick={() => {
                  onKeepAlive();
                  setMobileMenuOpen(false);
                }}
                className="bg-smu-gold text-smu-blue px-3 py-1 rounded-md text-sm font-medium"
              >
                Stay Active
              </button>
            </div>

            <div className="px-3 py-2 flex items-center space-x-2 border-t border-blue-700">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart: {cart.length} courses</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
