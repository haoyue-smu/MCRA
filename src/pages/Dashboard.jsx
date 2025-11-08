import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, ArrowRight, Star, AlertTriangle,
  CheckCircle, XCircle, DollarSign, Award, Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard({ cart }) {
  const quickLinks = [
    {
      title: 'Course Browser',
      description: 'Browse and add courses to cart',
      icon: BookOpen,
      path: '/courses',
      color: 'bg-blue-500'
    },
    {
      title: 'My Timetable',
      description: 'View schedule and check for clashes',
      icon: Calendar,
      path: '/timetable',
      color: 'bg-green-500'
    },
    {
      title: 'Bidding Optimizer',
      description: 'Plan your bidding strategy',
      icon: TrendingUp,
      path: '/bidding',
      color: 'bg-purple-500'
    },
    {
      title: 'Prerequisites',
      description: 'Check course dependencies',
      icon: GitBranch,
      path: '/prerequisites',
      color: 'bg-orange-500'
    },
    {
      title: 'Assessments',
      description: 'Track deadlines and hell weeks',
      icon: ClipboardList,
      path: '/assessments',
      color: 'bg-red-500'
    },
    {
      title: 'Career Pathways',
      description: 'Match skills to career paths',
      icon: Briefcase,
      path: '/career',
      color: 'bg-indigo-500'
    },
    {
      title: 'AI Recommender',
      description: 'Get course suggestions',
      icon: Brain,
      path: '/ai-recommender',
      color: 'bg-pink-500'
    }
  ];

  // Helper functions for dashboard stats
  const getTotalAssessments = () => {
    let total = 0;
    cart.forEach(course => {
      total += course.assessments.length;
    });
    return total;
  };

  const getAverageBid = () => {
    if (cart.length === 0) return 0;
    const sum = cart.reduce((acc, course) => acc + course.yearlyAverage, 0);
    return Math.round(sum / cart.length);
  };

  const getSUEligibleCount = () => {
    return cart.filter(c => c.suEligible).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-6">
            <div>
              <div className="text-sm font-medium opacity-90">Current Term</div>
              <div className="text-2xl font-bold">Term 3 2024-25</div>
            </div>
            <div className="h-12 w-px bg-white opacity-30"></div>
            <div>
              <div className="text-sm font-medium opacity-90">Bidding Status</div>
              <div className="text-2xl font-bold flex items-center">
                <span className="inline-block w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
                Open
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium opacity-90">Bidding Closes In</div>
            <div className="text-xl font-bold">3 days 14 hours</div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value text-smu-blue">{cart.length}</div>
          <div className="stat-label">Courses in Cart</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-green-600">{getSUEligibleCount()}</div>
          <div className="stat-label">S/U Eligible</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-purple-600">e$ {getAverageBid()}</div>
          <div className="stat-label">Avg Bid Needed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-orange-600">{getTotalAssessments()}</div>
          <div className="stat-label">Total Assessments</div>
        </div>
      </div>

      {/* Course Cards and Insights - Only show if cart has courses */}
      {cart.length > 0 ? (
        <>
          {/* Course Cards - Visual and Scannable */}
          <div className="mb-8">
            <h2 className="section-title">Your Selected Courses</h2>
            <p className="text-gray-600 mb-4">Quick overview of all courses in your cart</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-smu-blue mb-1">{course.id}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{course.name}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-bold text-gray-900">{course.afterClassRating}</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-2 mb-4">
                    {/* Bid Info - Most Important */}
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <div className="flex items-center text-purple-700">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="text-xs font-medium">Avg Bid</span>
                      </div>
                      <span className="text-sm font-bold text-purple-900">e$ {course.yearlyAverage}</span>
                    </div>

                    {/* S/U Eligibility */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-xs font-medium text-gray-700">S/U Eligible</span>
                      {course.suEligible ? (
                        <span className="flex items-center text-green-600 text-xs font-semibold">
                          <CheckCircle className="w-4 h-4 mr-1" />Yes
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 text-xs font-semibold">
                          <XCircle className="w-4 h-4 mr-1" />No
                        </span>
                      )}
                    </div>

                    {/* Workload */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-xs font-medium text-gray-700">Workload</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        course.workload === 'Very High' ? 'bg-red-100 text-red-700' :
                        course.workload === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {course.workload}
                      </span>
                    </div>

                    {/* Assessment Count */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-xs font-medium text-gray-700">Assessments</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {course.assessments.length} items
                      </span>
                    </div>
                  </div>

                  {/* Professor */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">{course.professor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Bidding Comparison Chart */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bidding Comparison</h3>
              <p className="text-sm text-gray-600 mb-4">
                Compare average bids needed for each course. Budget total: <strong>e$ {cart.reduce((sum, c) => sum + c.yearlyAverage, 0)}</strong>
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={cart.map(c => ({ name: c.id, bid: c.yearlyAverage }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'e$', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="bid" fill="#7c3aed" name="Avg Bid" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Highest Bid */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-purple-900">Highest Bid</h4>
                </div>
                <p className="text-2xl font-bold text-purple-900 mb-1">
                  {cart.reduce((max, c) => c.yearlyAverage > max.yearlyAverage ? c : max).id}
                </p>
                <p className="text-sm text-purple-700">
                  e$ {cart.reduce((max, c) => c.yearlyAverage > max.yearlyAverage ? c : max).yearlyAverage} avg
                </p>
              </div>

              {/* Best Rated */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Best Rated</h4>
                </div>
                <p className="text-2xl font-bold text-green-900 mb-1">
                  {cart.reduce((max, c) => c.afterClassRating > max.afterClassRating ? c : max).id}
                </p>
                <p className="text-sm text-green-700">
                  {cart.reduce((max, c) => c.afterClassRating > max.afterClassRating ? c : max).afterClassRating} / 5.0 stars
                </p>
              </div>

              {/* Total Workload */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-orange-600 mr-2" />
                  <h4 className="font-semibold text-orange-900">Total Workload</h4>
                </div>
                <p className="text-2xl font-bold text-orange-900 mb-1">
                  {getTotalAssessments()} assessments
                </p>
                <p className="text-sm text-orange-700">
                  {cart.filter(c => c.workload === 'Very High' || c.workload === 'High').length} high workload courses
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8 text-center">
          <AlertTriangle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses in Cart</h3>
          <p className="text-gray-600 mb-4">Add courses to see detailed comparisons, charts, and analytics</p>
          <Link
            to="/courses"
            className="inline-block bg-smu-blue text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="section-title">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${link.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-smu-blue group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
