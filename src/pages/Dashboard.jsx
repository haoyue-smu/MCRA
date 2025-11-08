import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, ArrowRight, Star, AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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

  // Prepare chart data for courses in cart

  // 1. Total e$ Budget Breakdown
  const prepareBudgetAllocation = () => {
    return cart.map(course => ({
      name: course.id,
      'Min Bid': course.bidHistory[0]?.minBid || 0,
      'Avg Bid': course.yearlyAverage,
      'Max Bid': course.bidHistory[0]?.maxBid || 0,
      demand: course.demand
    }));
  };

  // 2. Workload Distribution
  const prepareWorkloadDistribution = () => {
    return cart.map(course => {
      const quizzes = course.assessments.filter(a => a.type.toLowerCase().includes('quiz')).length;
      const exams = course.assessments.filter(a => a.type.toLowerCase().includes('exam')).length;
      const projects = course.assessments.filter(a => a.type.toLowerCase().includes('project')).length;
      const assignments = course.assessments.length - quizzes - exams - projects;

      return {
        code: course.id,
        Quizzes: quizzes,
        Exams: exams,
        Projects: projects,
        'Other': assignments
      };
    });
  };

  // 3. Course Rating vs Difficulty
  const prepareRatingDifficulty = () => {
    const difficultyScore = {
      'Easy': 1,
      'Medium': 2,
      'Hard': 3,
      'Very Hard': 4
    };

    return cart.map(course => ({
      name: course.id,
      rating: course.afterClassRating,
      difficulty: difficultyScore[course.difficulty] || 2,
      workload: course.workload
    }));
  };

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

      {/* Charts - Only show if cart has courses */}
      {cart.length > 0 ? (
        <>
          {/* Insightful Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Budget Allocation with Min/Avg/Max */}
            <div className="chart-card">
              <h3 className="chart-title">💰 Bidding Budget Planning</h3>
              <p className="chart-subtitle">
                Plan your e$ allocation. Green = minimum safe bid, Yellow = average bid, Red = competitive bid
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={prepareBudgetAllocation()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'e$', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Min Bid" fill="#10b981" name="Min (Safe)" />
                  <Bar dataKey="Avg Bid" fill="#f59e0b" name="Average" />
                  <Bar dataKey="Max Bid" fill="#ef4444" name="Max (Competitive)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Total Budget Needed:</strong> e${cart.reduce((sum, c) => sum + c.yearlyAverage, 0)} (avg) •
                  Max: e${cart.reduce((sum, c) => sum + (c.bidHistory[0]?.maxBid || 0), 0)}
                </p>
              </div>
            </div>

            {/* Workload Distribution Stacked */}
            <div className="chart-card">
              <h3 className="chart-title">📚 Assessment Workload Breakdown</h3>
              <p className="chart-subtitle">See how your assessments are distributed across courses</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={prepareWorkloadDistribution()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" />
                  <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Quizzes" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Exams" stackId="a" fill="#ef4444" />
                  <Bar dataKey="Projects" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="Other" stackId="a" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-800">
                  <strong>Total Assessments:</strong> {getTotalAssessments()} across {cart.length} courses
                </p>
              </div>
            </div>
          </div>

          {/* Course Quality Overview */}
          <div className="chart-card mb-8">
            <h3 className="chart-title">⭐ Course Quality Analysis</h3>
            <p className="chart-subtitle">
              Compare course ratings (1-5 stars) with difficulty level. Higher is more difficult.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareRatingDifficulty()} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: 'Rating (out of 5)', angle: -90, position: 'insideLeft' }} domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Difficulty', angle: 90, position: 'insideRight' }} domain={[0, 4]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="rating" fill="#10b981" name="Student Rating" />
                <Bar yAxisId="right" dataKey="difficulty" fill="#ef4444" name="Difficulty Level" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-800">
                  <strong>Avg Rating:</strong> {(cart.reduce((sum, c) => sum + c.afterClassRating, 0) / cart.length).toFixed(1)} / 5.0
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-red-800">
                  <strong>High Workload:</strong> {cart.filter(c => c.workload === 'High' || c.workload === 'Very High').length} courses
                </p>
              </div>
            </div>
          </div>

          {/* Course Details Table */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Your Course Overview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Professor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">S/U</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workload</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Bid</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map(course => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{course.id}</div>
                        <div className="text-sm text-gray-500">{course.name}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{course.professor}</td>
                      <td className="px-4 py-3">
                        {course.suEligible ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Yes</span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          course.workload === 'Very High' ? 'bg-red-100 text-red-700' :
                          course.workload === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {course.workload}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-semibold">{course.afterClassRating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-purple-600">e$ {course.yearlyAverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
