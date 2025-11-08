import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpen, Calendar, TrendingUp, GitBranch,
  ClipboardList, Briefcase, Brain, ArrowRight, Star, AlertTriangle,
  CheckCircle, XCircle, DollarSign, Award, Zap, Trash2, GraduationCap, Target,
  Clock, AlertOctagon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import { studentProgress, programRequirements } from '../data/mockData';

function Dashboard({ cart, removeFromCart }) {
  const [courseRatings, setCourseRatings] = useState({});
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

  // Prepare credit distribution data for pie chart
  const prepareCreditDistribution = () => {
    return [
      { name: 'Core Modules', value: studentProgress.creditsByType.core.completed, color: '#003D7C' },
      { name: 'Major Electives', value: studentProgress.creditsByType.majorElective.completed, color: '#D4A76A' },
      { name: 'Free Electives', value: studentProgress.creditsByType.freeElective.completed, color: '#10b981' },
      { name: 'Remaining', value: studentProgress.totalCreditsRequired - studentProgress.creditsCompleted, color: '#e5e7eb' }
    ];
  };

  const handleRateCourse = (courseId, rating) => {
    setCourseRatings(prev => ({
      ...prev,
      [courseId]: rating
    }));
    // In a real app, this would save to backend
    localStorage.setItem('courseRatings', JSON.stringify({
      ...courseRatings,
      [courseId]: rating
    }));
  };

  const COLORS = ['#003D7C', '#D4A76A', '#10b981', '#e5e7eb'];

  // Bidding Health Check logic
  const STUDENT_BUDGET = 100; // e$ budget for bidding

  const calculateBiddingHealth = () => {
    if (cart.length === 0) {
      return {
        status: 'action',
        title: 'Action Required',
        message: 'Add courses to your cart to start planning',
        icon: AlertOctagon,
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        borderColor: 'border-red-200'
      };
    }

    const totalBidNeeded = cart.reduce((sum, c) => sum + c.yearlyAverage, 0);
    const overBudget = totalBidNeeded > STUDENT_BUDGET;
    const totalAssessments = getTotalAssessments();
    const heavyWorkload = totalAssessments > 18;

    // Check for time clashes
    const timeClashes = checkTimeClashes();

    // Check for missing prerequisites
    const missingPrereqs = checkPrerequisites();

    if (missingPrereqs.length > 0 || timeClashes.length > 0) {
      return {
        status: 'action',
        title: 'Action Required',
        message: `${missingPrereqs.length > 0 ? 'Missing prerequisites. ' : ''}${timeClashes.length > 0 ? `${timeClashes.length} schedule conflicts detected.` : ''}`,
        icon: AlertOctagon,
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        borderColor: 'border-red-200'
      };
    }

    if (overBudget || heavyWorkload) {
      return {
        status: 'review',
        title: 'Review Needed',
        message: `${overBudget ? `Budget exceeded by e$ ${totalBidNeeded - STUDENT_BUDGET}. ` : ''}${heavyWorkload ? `Heavy workload: ${totalAssessments} assessments.` : ''}`,
        icon: AlertTriangle,
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-200'
      };
    }

    return {
      status: 'ready',
      title: 'Ready to Bid',
      message: `Budget: e$ ${totalBidNeeded}/${STUDENT_BUDGET}. All prerequisites met. No schedule conflicts.`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    };
  };

  const checkTimeClashes = () => {
    const clashes = [];

    // Check for class time conflicts (same day + exact same time)
    for (let i = 0; i < cart.length; i++) {
      for (let j = i + 1; j < cart.length; j++) {
        const course1 = cart[i];
        const course2 = cart[j];

        for (const schedule1 of course1.schedule) {
          for (const schedule2 of course2.schedule) {
            if (schedule1.day === schedule2.day && schedule1.time === schedule2.time) {
              clashes.push({
                type: 'class',
                course1: course1.id,
                course2: course2.id,
                day: schedule1.day,
                time: schedule1.time
              });
            }
          }
        }
      }
    }

    // Check for exam conflicts (same exam date)
    for (let i = 0; i < cart.length; i++) {
      for (let j = i + 1; j < cart.length; j++) {
        const course1 = cart[i];
        const course2 = cart[j];

        // Get final exams for both courses
        const exam1 = course1.assessments.find(a => a.type.toLowerCase().includes('final exam'));
        const exam2 = course2.assessments.find(a => a.type.toLowerCase().includes('final exam'));

        if (exam1 && exam2 && exam1.date === exam2.date) {
          clashes.push({
            type: 'exam',
            course1: course1.id,
            course2: course2.id,
            examDate: exam1.date
          });
        }
      }
    }

    return clashes;
  };

  const checkPrerequisites = () => {
    const missing = [];
    const completedCourses = ['IS111', 'IS112', 'STAT151']; // Mock completed courses

    cart.forEach(course => {
      if (course.prerequisites && course.prerequisites.length > 0) {
        const missingPrereqs = course.prerequisites.filter(
          prereq => !completedCourses.includes(prereq)
        );
        if (missingPrereqs.length > 0) {
          missing.push({
            course: course.id,
            prerequisites: missingPrereqs
          });
        }
      }
    });

    return missing;
  };

  const biddingHealth = calculateBiddingHealth();
  const HealthIcon = biddingHealth.icon;

  const [showClashDetails, setShowClashDetails] = useState(false);
  const [showPrereqDetails, setShowPrereqDetails] = useState(false);

  const timeClashes = checkTimeClashes();
  const missingPrereqs = checkPrerequisites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
      </div>

      {/* Schedule Conflicts Alert */}
      {timeClashes.length > 0 && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <AlertOctagon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-red-900">Schedule Conflicts Detected!</h3>
                <p className="text-sm text-red-800 mt-1">
                  {timeClashes.length} schedule conflict{timeClashes.length > 1 ? 's' : ''} found in your cart.
                </p>
                <button
                  onClick={() => setShowClashDetails(!showClashDetails)}
                  className="text-sm text-red-700 underline mt-2 hover:text-red-900"
                >
                  {showClashDetails ? 'Hide details' : 'View details'}
                </button>
                {showClashDetails && (
                  <div className="mt-3 p-3 bg-white rounded border border-red-300">
                    <div className="space-y-2">
                      {timeClashes.map((clash, idx) => (
                        <div key={idx} className="text-sm text-red-900">
                          {clash.type === 'class' ? (
                            <>
                              <strong>{clash.course1}</strong> and <strong>{clash.course2}</strong> have the same class time: <strong>{clash.day} {clash.time}</strong>
                            </>
                          ) : (
                            <>
                              <strong>{clash.course1}</strong> and <strong>{clash.course2}</strong> have exams on the same date: <strong>{new Date(clash.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Missing Prerequisites Alert */}
      {missingPrereqs.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-yellow-900">Missing Prerequisites!</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  {missingPrereqs.length} course{missingPrereqs.length > 1 ? 's' : ''} in your cart {missingPrereqs.length > 1 ? 'have' : 'has'} unfulfilled prerequisites.
                </p>
                <button
                  onClick={() => setShowPrereqDetails(!showPrereqDetails)}
                  className="text-sm text-yellow-700 underline mt-2 hover:text-yellow-900"
                >
                  {showPrereqDetails ? 'Hide details' : 'View details'}
                </button>
                {showPrereqDetails && (
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-300">
                    <div className="space-y-2">
                      {missingPrereqs.map((item, idx) => (
                        <div key={idx} className="text-sm text-yellow-900">
                          <strong>{item.course}</strong> requires: <strong>{item.prerequisites.join(', ')}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div>
              <div className="text-sm font-medium opacity-90">Current Term</div>
              <div className="text-xl md:text-2xl font-bold">Term 3 2024-25</div>
            </div>
            <div className="hidden sm:block h-12 w-px bg-white opacity-30"></div>
            <div>
              <div className="text-sm font-medium opacity-90">Bidding Status</div>
              <div className="text-xl md:text-2xl font-bold flex items-center">
                <span className="inline-block w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
                Open
              </div>
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            <div className="text-sm font-medium opacity-90">Bidding Closes In</div>
            <div className="text-lg md:text-xl font-bold">3 days 14 hours</div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {/* Academic Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Credits Completed Tracker */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-6 h-6 text-smu-blue mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Degree Progress</h3>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-bold text-smu-blue">{studentProgress.creditsCompleted}</span>
              <span className="text-lg text-gray-600">/ {studentProgress.totalCreditsRequired} credits</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-smu-blue to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${(studentProgress.creditsCompleted / studentProgress.totalCreditsRequired) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {Math.round((studentProgress.creditsCompleted / studentProgress.totalCreditsRequired) * 100)}% Complete •
              {studentProgress.totalCreditsRequired - studentProgress.creditsCompleted} credits remaining
            </p>
          </div>

          {/* Credit Breakdown */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-smu-blue rounded-full mr-2"></div>
                <span className="text-gray-700">Core Modules</span>
              </div>
              <span className="font-semibold">
                {studentProgress.creditsByType.core.completed}/{studentProgress.creditsByType.core.required}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-smu-gold rounded-full mr-2"></div>
                <span className="text-gray-700">Major Electives</span>
              </div>
              <span className="font-semibold">
                {studentProgress.creditsByType.majorElective.completed}/{studentProgress.creditsByType.majorElective.required}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Free Electives</span>
              </div>
              <span className="font-semibold">
                {studentProgress.creditsByType.freeElective.completed}/{studentProgress.creditsByType.freeElective.required}
              </span>
            </div>
          </div>
        </div>

        {/* Credit Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-smu-blue mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Credit Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={prepareCreditDistribution()}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {prepareCreditDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {prepareCreditDistribution().map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-gray-700">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>

          {/* What's Next? Suggestions */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 text-sm mb-2">📌 What's Next?</h4>
            <div className="text-xs text-blue-800 space-y-1">
              {studentProgress.creditsByType.core.completed < studentProgress.creditsByType.core.required && (
                <p>• Need {studentProgress.creditsByType.core.required - studentProgress.creditsByType.core.completed} more <strong>Core</strong> credits (e.g., IS214, IS215)</p>
              )}
              {studentProgress.creditsByType.majorElective.completed < studentProgress.creditsByType.majorElective.required && (
                <p>• Need {studentProgress.creditsByType.majorElective.required - studentProgress.creditsByType.majorElective.completed} more <strong>Major Elective</strong> credits (e.g., IS213, IS301)</p>
              )}
              {studentProgress.creditsByType.freeElective.completed < studentProgress.creditsByType.freeElective.required && (
                <p>• Need {studentProgress.creditsByType.freeElective.required - studentProgress.creditsByType.freeElective.completed} more <strong>Free Elective</strong> credits (explore any department!)</p>
              )}
              {studentProgress.creditsCompleted >= studentProgress.totalCreditsRequired && (
                <p className="text-green-700">🎉 All degree requirements met! Ready to graduate!</p>
              )}
            </div>
          </div>
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

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(course.id);
                    }}
                    className="mt-3 w-full btn-danger flex items-center justify-center text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove from Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Bidding Comparison Chart */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bidding Comparison</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your Budget: <strong className="text-purple-600">e$ {STUDENT_BUDGET}</strong> |
                Total Needed: <strong className={cart.reduce((sum, c) => sum + c.yearlyAverage, 0) > STUDENT_BUDGET ? 'text-red-600' : 'text-green-600'}>
                  e$ {cart.reduce((sum, c) => sum + c.yearlyAverage, 0)}
                </strong>
                {cart.reduce((sum, c) => sum + c.yearlyAverage, 0) > STUDENT_BUDGET && (
                  <span className="ml-2 text-red-600">(Over budget by e$ {cart.reduce((sum, c) => sum + c.yearlyAverage, 0) - STUDENT_BUDGET}!)</span>
                )}
              </p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cart.map(c => ({ name: c.id, bid: c.yearlyAverage }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'e$', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={STUDENT_BUDGET / cart.length}
                    label={`Avg Budget (e$ ${Math.round(STUDENT_BUDGET / cart.length)})`}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                  />
                  <Bar dataKey="bid" fill="#7c3aed" name="Avg Bid" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-2">
                Red dashed line shows average budget per course (e$ {Math.round(STUDENT_BUDGET / cart.length)} each)
              </p>
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
    </div>
  );
}

export default Dashboard;
