import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, ArrowRight,
  TrendingUp as TrendUp, TrendingDown, Award
} from 'lucide-react';
import { impactMetrics } from '../data/mockData';

function Dashboard({ cart }) {
  const quickLinks = [
    {
      title: 'Course Browser',
      description: 'Browse courses with live demand and S/U indicators',
      icon: BookOpen,
      path: '/courses',
      color: 'bg-blue-500'
    },
    {
      title: 'My Timetable',
      description: 'View auto-generated timetable from your cart',
      icon: Calendar,
      path: '/timetable',
      color: 'bg-green-500'
    },
    {
      title: 'Bidding Optimizer',
      description: 'Smart bidding insights with historical trends',
      icon: TrendingUp,
      path: '/bidding',
      color: 'bg-purple-500'
    },
    {
      title: 'Prerequisites',
      description: 'Visualize course dependencies',
      icon: GitBranch,
      path: '/prerequisites',
      color: 'bg-orange-500'
    },
    {
      title: 'Assessments',
      description: 'Track all deadlines and exams',
      icon: ClipboardList,
      path: '/assessments',
      color: 'bg-red-500'
    },
    {
      title: 'Career Pathways',
      description: 'Connect courses to career goals',
      icon: Briefcase,
      path: '/career',
      color: 'bg-indigo-500'
    },
    {
      title: 'AI Recommender',
      description: 'Get personalized course suggestions',
      icon: Brain,
      path: '/ai-recommender',
      color: 'bg-pink-500'
    }
  ];

  const MetricCard = ({ title, value, change, trend, unit = '%' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-smu-blue">
            {value}{unit === '%' ? '%' : ''}
          </p>
          {unit !== '%' && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
        <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          {trend === 'up' ? (
            <TrendUp className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
          ) : (
            <TrendingDown className={`w-6 h-6 text-red-600`} />
          )}
        </div>
      </div>
      <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last semester
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-smu-blue to-blue-700 rounded-lg shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center mb-4">
          <Award className="w-12 h-12 text-smu-gold mr-4" />
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to SCIS Smart Planner</h1>
            <p className="text-xl text-blue-100">
              Empowering SCIS students with transparent academic choices and data-driven guidance
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
            <p className="text-2xl font-bold">{cart.length}</p>
            <p className="text-blue-100">Courses in Cart</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
            <p className="text-2xl font-bold">Term 3 2024-25</p>
            <p className="text-blue-100">Current Term</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
            <p className="text-2xl font-bold">Bidding Open</p>
            <p className="text-blue-100">Status</p>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-smu-blue mb-4 flex items-center">
          <TrendUp className="w-6 h-6 mr-2" />
          Platform Impact Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Student Satisfaction"
            value={impactMetrics.studentSatisfaction.value}
            change={impactMetrics.studentSatisfaction.change}
            trend={impactMetrics.studentSatisfaction.trend}
          />
          <MetricCard
            title="Retention Rate"
            value={impactMetrics.retentionRate.value}
            change={impactMetrics.retentionRate.change}
            trend={impactMetrics.retentionRate.trend}
          />
          <MetricCard
            title="Faculty Response"
            value={impactMetrics.facultyResponseTime.value}
            change={impactMetrics.facultyResponseTime.change}
            trend={impactMetrics.facultyResponseTime.trend}
            unit={impactMetrics.facultyResponseTime.unit}
          />
          <MetricCard
            title="Enrollment Rate"
            value={impactMetrics.enrollmentConversion.value}
            change={impactMetrics.enrollmentConversion.change}
            trend={impactMetrics.enrollmentConversion.trend}
          />
          <MetricCard
            title="GPA Stress"
            value={impactMetrics.gpaStressScore.value}
            change={impactMetrics.gpaStressScore.change}
            trend={impactMetrics.gpaStressScore.trend}
            unit={impactMetrics.gpaStressScore.unit}
          />
        </div>
      </div>

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
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group"
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

      {/* Value Proposition */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-smu-blue mb-4">Why SCIS Smart Planner?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Transparency</h3>
            <p className="text-gray-600">
              Clear visibility into S/U policies, workload expectations, and bidding trends
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Reduced Stress</h3>
            <p className="text-gray-600">
              Make informed decisions with data-driven insights, reducing academic uncertainty
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Empowerment</h3>
            <p className="text-gray-600">
              Greater flexibility in course selection with comprehensive information at your fingertips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
