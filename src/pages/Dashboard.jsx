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
  const prepareWorkloadData = () => {
    return cart.map(course => ({
      code: course.id,
      rating: course.afterClassRating,
      avgBid: course.yearlyAverage,
      quizzes: course.assessments.filter(a => a.type.toLowerCase().includes('quiz')).length,
      exams: course.assessments.filter(a => a.type.toLowerCase().includes('exam')).length
    }));
  };

  const prepareBiddingComparisonData = () => {
    return cart.map(course => ({
      name: course.id,
      'Yearly Avg': course.yearlyAverage,
      'Recommended': Math.round(course.yearlyAverage * 1.1)
    }));
  };

  const prepareRadarData = () => {
    // Convert workload and difficulty to numeric scores
    const workloadScore = {
      'Low': 2,
      'Medium': 4,
      'High': 6,
      'Very High': 8
    };
    const difficultyScore = {
      'Easy': 2,
      'Medium': 5,
      'Hard': 7,
      'Very Hard': 9
    };

    return cart.map(course => ({
      course: course.id,
      Workload: workloadScore[course.workload] || 5,
      Difficulty: difficultyScore[course.difficulty] || 5,
      Rating: course.afterClassRating * 2
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
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-smu-blue mb-2">My Dashboard</h1>
        <p className="text-gray-600">Term 3 2024-25 • Bidding Status: Open</p>
      </div>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 fade-in">
        <div className="stat-card">
          <div className="text-3xl font-bold text-smu-blue mb-1">{cart.length}</div>
          <div className="text-sm text-gray-600">Courses in Cart</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-green-600 mb-1">{getSUEligibleCount()}</div>
          <div className="text-sm text-gray-600">S/U Eligible</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-purple-600 mb-1">e$ {getAverageBid()}</div>
          <div className="text-sm text-gray-600">Avg Bid Needed</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-orange-600 mb-1">{getTotalAssessments()}</div>
          <div className="text-sm text-gray-600">Total Assessments</div>
        </div>
      </div>

      {/* Charts - Only show if cart has courses */}
      {cart.length > 0 ? (
        <>
          {/* Course Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 slide-up">
            {/* Bidding Comparison */}
            <div className="chart-container bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Bidding Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={prepareBiddingComparisonData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'e$', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Yearly Avg" fill="#8b5cf6" />
                  <Bar dataKey="Recommended" fill="#d4a76a" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-2">Gold bars show recommended bidding amount (+10%)</p>
            </div>

            {/* Professor Ratings & Assessment Count */}
            <div className="chart-container bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⭐ Ratings & Assessments</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={prepareWorkloadData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="rating" fill="#10b981" name="Rating (out of 5)" />
                  <Bar yAxisId="right" dataKey="quizzes" fill="#f59e0b" name="Quizzes" />
                  <Bar yAxisId="right" dataKey="exams" fill="#ef4444" name="Exams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Workload Radar Chart */}
          <div className="chart-container bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Course Workload & Difficulty Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={prepareRadarData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="course" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                <Radar name="Workload" dataKey="Workload" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Radar name="Difficulty" dataKey="Difficulty" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                <Radar name="Rating x2" dataKey="Rating" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2 text-center">Compare workload, difficulty, and ratings across your selected courses</p>
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
        <div className="alert-warning text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses in Cart</h3>
          <p className="text-gray-600 mb-4">Add courses to see detailed comparisons, charts, and analytics</p>
          <Link
            to="/courses"
            className="btn-modern btn-shimmer inline-block text-white px-6 py-2 rounded-md"
          >
            Browse Courses
          </Link>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold text-smu-blue mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="card-hover-lift bg-white rounded-lg shadow-md p-6 group"
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
