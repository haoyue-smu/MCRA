import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, Menu, X, Settings, ChevronLeft, ChevronRight, LogOut, User
} from 'lucide-react';

function Sidebar({ cart, user, onLogout, onCollapseChange, isCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCustomize, setShowCustomize] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Notify parent when collapse state changes
  const handleToggleCollapse = () => {
    if (onCollapseChange) {
      onCollapseChange(!isCollapsed);
    }
  };

  // Load saved preferences from localStorage
  const [visibleItems, setVisibleItems] = useState(() => {
    const saved = localStorage.getItem('sidebarPreferences');
    return saved ? JSON.parse(saved) : {
      home: true,
      courses: true,
      timetable: true,
      assessments: true,
      bidding: true,
      prerequisites: true,
      career: true,
      ai: true
    };
  });

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', key: 'home' },
    { path: '/courses', icon: BookOpen, label: 'Courses', key: 'courses' },
    { path: '/timetable', icon: Calendar, label: 'Timetable', key: 'timetable' },
    { path: '/assessments', icon: ClipboardList, label: 'Assessments', key: 'assessments' },
    { path: '/bidding', icon: TrendingUp, label: 'Bidding Optimizer', key: 'bidding' },
    { path: '/prerequisites', icon: GitBranch, label: 'Prerequisites', key: 'prerequisites' },
    { path: '/career', icon: Briefcase, label: 'Career Pathways', key: 'career' },
    { path: '/ai-recommender', icon: Brain, label: 'AI Recommender', key: 'ai' }
  ];

  const visibleNavItems = navItems.filter(item => visibleItems[item.key]);

  const toggleVisibility = (key) => {
    const newVisibility = { ...visibleItems, [key]: !visibleItems[key] };
    setVisibleItems(newVisibility);
    localStorage.setItem('sidebarPreferences', JSON.stringify(newVisibility));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-smu-blue text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 z-40 shadow-xl border-r border-gray-200 ${
        isCollapsed ? 'w-24' : 'w-80'
      } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-smu-blue via-blue-700 to-smu-blue p-6 relative overflow-hidden">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

          <div className="relative z-10 flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <span className="text-smu-gold mr-2">●</span>
                  SCIS Planner
                </h1>
                <p className="text-xs text-blue-100 mt-1">Smart Course Planning</p>
              </div>
            )}
            <button
              onClick={handleToggleCollapse}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5 text-white" /> : <ChevronLeft className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Cart Count Badge */}
        {!isCollapsed && cart.length > 0 && (
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Courses in Cart</span>
              <span className="bg-gradient-to-r from-smu-blue to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {cart.length}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="py-2 flex-1 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-center mx-2 px-4 py-3 rounded-lg transition-all ${
                  isCollapsed ? 'mx-auto w-16' : ''
                } ${
                  active
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-smu-blue border-l-4 border-smu-blue shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-smu-blue'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} ${active ? 'text-smu-blue' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <span className={`ml-3 ${active ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section & Actions */}
        <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4 space-y-2">
          {/* User Info */}
          {user && !isCollapsed && (
            <div className="px-4 py-3 bg-white rounded-lg mb-2 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-smu-blue to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Customize Button */}
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          >
            <Settings className="w-5 h-5 text-gray-500" />
            {!isCollapsed && <span className="ml-3 font-medium">Customize Sidebar</span>}
          </button>

          {/* Logout Button */}
          {user && (
            <button
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3 font-medium">Sign Out</span>}
            </button>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomize && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Customize Sidebar</h3>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Show or hide items in your sidebar navigation
              </p>
            </div>

            <div className="p-6 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-smu-blue mr-3" />
                      <span className="text-gray-900">{item.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={visibleItems[item.key]}
                      onChange={() => toggleVisibility(item.key)}
                      className="w-5 h-5 text-smu-blue rounded focus:ring-2 focus:ring-smu-blue"
                    />
                  </label>
                );
              })}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowCustomize(false)}
                className="w-full bg-smu-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
