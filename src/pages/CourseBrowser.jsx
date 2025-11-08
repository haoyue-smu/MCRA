import { useState } from 'react';
import {
  Search, Filter, Star, TrendingUp, CheckCircle, XCircle,
  ShoppingCart, BookOpen, Users, Bell, BellOff, AlertCircle
} from 'lucide-react';
import { courses } from '../data/mockData';

function CourseBrowser({ cart, addToCart, removeFromCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDemand, setFilterDemand] = useState('all');
  const [filterSU, setFilterSU] = useState('all');
  const [filterProfessor, setFilterProfessor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('courseSubscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDemand = filterDemand === 'all' || course.demand === filterDemand;
    const matchesSU = filterSU === 'all' ||
                     (filterSU === 'eligible' && course.suEligible) ||
                     (filterSU === 'not-eligible' && !course.suEligible);
    const matchesProfessor = !filterProfessor ||
                            course.professor.toLowerCase().includes(filterProfessor.toLowerCase());

    return matchesSearch && matchesDemand && matchesSU && matchesProfessor;
  });

  const isInCart = (courseId) => cart.some(c => c.id === courseId);

  const isSubscribed = (courseId) => subscriptions.includes(courseId);

  const toggleSubscription = (courseId) => {
    const newSubscriptions = isSubscribed(courseId)
      ? subscriptions.filter(id => id !== courseId)
      : [...subscriptions, courseId];

    setSubscriptions(newSubscriptions);
    localStorage.setItem('courseSubscriptions', JSON.stringify(newSubscriptions));
  };

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const CourseCard = ({ course }) => (
    <div
      className="course-card"
      onClick={() => setSelectedCourse(course)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-smu-blue">{course.id}</h3>
            {course.suEligible ? (
              <span className="badge-green flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                S/U Eligible
              </span>
            ) : (
              <span className="badge-red flex items-center">
                <XCircle className="w-3 h-3 mr-1" />
                No S/U
              </span>
            )}
          </div>
          <h4 className="text-md font-semibold text-gray-900 mb-2">{course.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{course.professor}</p>
          <p className="text-sm text-gray-700">{course.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Demand</span>
          <span className={`text-sm font-semibold px-2 py-1 rounded ${getDemandColor(course.demand)}`}>
            {course.demand}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Subscribers</span>
          <span className="text-sm font-semibold text-gray-900 flex items-center">
            <Bell className="w-3 h-3 mr-1 text-blue-500" />
            {course.subscribers}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Rating</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900 ml-1">{course.afterClassRating}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Workload</span>
          <span className="text-sm font-semibold text-gray-900">{course.workload}</span>
        </div>
      </div>

      {/* Bidding Information */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-purple-700 font-semibold mb-1">Bidding Range (Past Year)</div>
            <div className="text-sm font-bold text-purple-900">{course.bidRange}</div>
          </div>
          <div className="border-l border-purple-300 pl-3 ml-3">
            <div className="text-xs text-purple-700 font-semibold mb-1">Yearly Avg</div>
            <div className="text-sm font-bold text-purple-900">e$ {course.yearlyAverage}</div>
          </div>
        </div>
      </div>

      {/* Class Schedule Preview */}
      <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <div className="text-xs text-indigo-700 font-semibold mb-2">⏰ Class Schedule</div>
        <div className="space-y-1">
          {course.schedule.map((s, i) => (
            <div key={i} className="text-xs text-indigo-900">
              <span className="font-semibold">{s.day}</span>: {s.time}
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Summary */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs text-blue-700 font-semibold mb-2">📊 Workload Preview</div>
        <div className="flex flex-wrap gap-2">
          {course.assessments.map((assessment, i) => (
            <span key={i} className="text-xs bg-white text-blue-700 px-2 py-1 rounded border border-blue-300">
              {assessment.type} ({assessment.weight}%)
            </span>
          ))}
        </div>
        <div className="mt-2 text-xs text-blue-600">
          {course.assessments.filter(a => a.type.toLowerCase().includes('quiz')).length} Quizzes •
          {course.assessments.filter(a => a.type.toLowerCase().includes('exam')).length} Exams •
          {course.assessments.filter(a => a.type.toLowerCase().includes('project')).length} Projects
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {isInCart(course.id) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(course.id);
            }}
            className="btn-danger flex-1 flex items-center justify-center"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(course.id);
            }}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSubscription(course.id);
          }}
          className={`${
            isSubscribed(course.id) ? 'btn-secondary' : 'btn-success'
          } flex items-center`}
        >
          {isSubscribed(course.id) ? (
            <>
              <BellOff className="w-4 h-4 mr-2" />
              Unsubscribe
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Course Browser</h1>
        <p className="page-description">Browse courses with live demand transparency and S/U indicators</p>
      </div>

      {/* S/U Policy Info Banner */}
      <div className="alert-info">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">S/U Policy Reminder</h3>
            <p className="text-sm text-blue-800">
              You can S/U up to 12 CUs. Core modules and final semester courses cannot be S/U-ed.
              Courses marked with a green badge are S/U eligible.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, professors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center md:justify-start"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demand Level</label>
              <select
                value={filterDemand}
                onChange={(e) => setFilterDemand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              >
                <option value="all">All Levels</option>
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">S/U Eligibility</label>
              <select
                value={filterSU}
                onChange={(e) => setFilterSU(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              >
                <option value="all">All Courses</option>
                <option value="eligible">S/U Eligible Only</option>
                <option value="not-eligible">Not S/U Eligible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professor</label>
              <input
                type="text"
                placeholder="Filter by professor..."
                value={filterProfessor}
                onChange={(e) => setFilterProfessor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredCourses.length}</span> courses
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{cart.length} in cart</span>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-smu-blue mb-2">{selectedCourse.id} - {selectedCourse.name}</h2>
                  <p className="text-gray-600">{selectedCourse.professor}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedCourse.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Schedule</h3>
                  {selectedCourse.schedule.map((s, i) => (
                    <p key={i} className="text-gray-700">
                      {s.day}, {s.time} - {s.location}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Assessments & Deadlines</h3>
                  <div className="space-y-2">
                    {selectedCourse.assessments.map((a, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{a.type}</div>
                            {a.title && <div className="text-sm text-gray-600 mt-1">{a.title}</div>}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-smu-blue">{a.weight}%</div>
                            <div className="text-xs text-gray-600 mt-1">{new Date(a.date).toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bidding Information in Modal */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold mb-3">Bidding Information</h3>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-purple-700 font-semibold mb-1">Yearly Average</div>
                      <div className="text-2xl font-bold text-purple-900">e$ {selectedCourse.yearlyAverage}</div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-700 font-semibold mb-1">Bidding Range</div>
                      <div className="text-xl font-bold text-purple-900">{selectedCourse.bidRange}</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-700 font-semibold mb-2">Historical Trends (Past Year)</div>
                  <div className="space-y-1">
                    {selectedCourse.bidHistory.map((history, i) => (
                      <div key={i} className="flex justify-between text-sm bg-white p-2 rounded">
                        <span className="text-gray-700">{history.term}</span>
                        <span className="text-gray-600">
                          Min: <span className="font-semibold text-green-600">{history.minBid}</span> |
                          Avg: <span className="font-semibold text-blue-600"> {history.avgBid}</span> |
                          Max: <span className="font-semibold text-red-600"> {history.maxBid}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Career Paths</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.careerPaths.map((path, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {path}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Skills Gained</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBrowser;
