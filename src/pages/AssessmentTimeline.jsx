import { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

function AssessmentTimeline({ cart }) {
  const [viewMode, setViewMode] = useState('timeline'); // timeline or calendar

  const getAllAssessments = () => {
    const assessments = [];
    cart.forEach(course => {
      course.assessments.forEach(assessment => {
        assessments.push({
          ...assessment,
          courseId: course.id,
          courseName: course.name,
          courseColor: getCourseColor(course.id)
        });
      });
    });
    return assessments.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getCourseColor = (courseId) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = cart.findIndex(c => c.id === courseId);
    return colors[index % colors.length];
  };

  const getAssessmentIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'quiz':
        return <FileText className="w-4 h-4" />;
      case 'midterm':
      case 'final':
        return <AlertTriangle className="w-4 h-4" />;
      case 'project':
      case 'group project':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getUrgencyLevel = (date) => {
    const today = new Date();
    const assessmentDate = new Date(date);
    const daysUntil = Math.ceil((assessmentDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return 'past';
    if (daysUntil <= 7) return 'urgent';
    if (daysUntil <= 14) return 'soon';
    return 'upcoming';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'past':
        return 'bg-gray-100 text-gray-500 border-gray-300';
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-300';
      case 'soon':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-300';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-SG', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const assessmentDate = new Date(date);
    const daysUntil = Math.ceil((assessmentDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const assessments = getAllAssessments();

  const assessmentsByWeek = assessments.reduce((acc, assessment) => {
    const date = new Date(assessment.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!acc[weekKey]) {
      acc[weekKey] = [];
    }
    acc[weekKey].push(assessment);
    return acc;
  }, {});

  return (
    <div className="w-full px-16 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">Assessment Timeline</h1>
        <p className="text-gray-600">Track all your deadlines, quizzes, projects, and exams</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">No Courses in Cart</h3>
              <p className="text-sm text-yellow-800">
                Add courses to your cart to view their assessment timelines.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-smu-blue">{assessments.length}</p>
                </div>
                <FileText className="w-8 h-8 text-smu-blue" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming (14 days)</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {assessments.filter(a => {
                      const days = getDaysUntil(a.date);
                      return days >= 0 && days <= 14;
                    }).length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Urgent (7 days)</p>
                  <p className="text-2xl font-bold text-red-600">
                    {assessments.filter(a => {
                      const days = getDaysUntil(a.date);
                      return days >= 0 && days <= 7;
                    }).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Weight</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {assessments.reduce((sum, a) => sum + a.weight, 0)}%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mb-6 flex space-x-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-smu-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-smu-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Weekly View
            </button>
          </div>

          {/* Timeline View */}
          {viewMode === 'timeline' && (
            <div className="space-y-4">
              {assessments.map((assessment, index) => {
                const urgency = getUrgencyLevel(assessment.date);
                const daysUntil = getDaysUntil(assessment.date);

                return (
                  <div
                    key={`${assessment.courseId}-${index}`}
                    className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getUrgencyColor(urgency)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`${assessment.courseColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                            {assessment.courseId}
                          </span>
                          <div className="flex items-center space-x-2">
                            {getAssessmentIcon(assessment.type)}
                            <span className="font-semibold text-gray-900">{assessment.type}</span>
                          </div>
                          <span className="text-sm text-gray-600">{assessment.weight}% of grade</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{assessment.courseName}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(assessment.date)}
                          </div>
                          {daysUntil >= 0 && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {daysUntil === 0 ? 'Today' : `${daysUntil} day${daysUntil > 1 ? 's' : ''} away`}
                            </div>
                          )}
                        </div>
                      </div>
                      {urgency === 'urgent' && (
                        <div className="ml-4">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            URGENT
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Weekly View */}
          {viewMode === 'calendar' && (
            <div className="space-y-6">
              {Object.entries(assessmentsByWeek).map(([weekKey, weekAssessments]) => {
                const weekStart = new Date(weekKey);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);

                // Identify "Hell Weeks" - weeks with 3+ assessments
                const isHellWeek = weekAssessments.length >= 3;
                const isVeryBusyWeek = weekAssessments.length >= 5;

                return (
                  <div
                    key={weekKey}
                    className={`rounded-lg shadow-md p-6 border-2 ${
                      isVeryBusyWeek
                        ? 'bg-red-50 border-red-400'
                        : isHellWeek
                        ? 'bg-orange-50 border-orange-400'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-smu-blue">
                        Week of {weekStart.toLocaleDateString('en-SG', { month: 'long', day: 'numeric' })} -{' '}
                        {weekEnd.toLocaleDateString('en-SG', { month: 'long', day: 'numeric' })}
                      </h3>
                      {isVeryBusyWeek && (
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          🔥 HELL WEEK ({weekAssessments.length} assessments)
                        </span>
                      )}
                      {isHellWeek && !isVeryBusyWeek && (
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          ⚠️ Busy Week ({weekAssessments.length} assessments)
                        </span>
                      )}
                      {!isHellWeek && (
                        <span className="text-sm text-gray-600">{weekAssessments.length} assessment{weekAssessments.length > 1 ? 's' : ''}</span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {weekAssessments.map((assessment, index) => (
                        <div
                          key={`${assessment.courseId}-${index}`}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className={`${assessment.courseColor} text-white px-2 py-1 rounded text-xs font-semibold`}>
                            {assessment.courseId}
                          </span>
                          <div className="flex items-center">
                            {getAssessmentIcon(assessment.type)}
                            <span className="ml-2 font-medium">{assessment.type}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(assessment.date).toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-sm text-gray-500">({assessment.weight}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Study Plan Tips */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Study Planning Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Start preparing at least 1 week before major assessments (midterms, finals)</li>
              <li>• Block out study time when multiple assessments fall in the same week</li>
              <li>• Prioritize high-weight assessments in your study schedule</li>
              <li>• Review quiz content regularly as it often appears in final exams</li>
              <li>• Start group projects early to coordinate with team members</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default AssessmentTimeline;
