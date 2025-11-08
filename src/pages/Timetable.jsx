import { AlertCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { publicHolidays } from '../data/mockData';

function Timetable({ cart }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:15', '09:30', '10:45', '12:00', '13:15', '14:30', '15:30', '16:45', '18:00', '19:00'
  ];

  const parseTime = (timeStr) => {
    const [time] = timeStr.split('-');
    return time.trim();
  };

  const getColorForCourse = (index) => {
    const colors = [
      'bg-blue-100 border-blue-400 text-blue-900',
      'bg-green-100 border-green-400 text-green-900',
      'bg-purple-100 border-purple-400 text-purple-900',
      'bg-orange-100 border-orange-400 text-orange-900',
      'bg-pink-100 border-pink-400 text-pink-900',
      'bg-indigo-100 border-indigo-400 text-indigo-900'
    ];
    return colors[index % colors.length];
  };

  const getTimetableEvents = () => {
    const events = [];
    cart.forEach((course, courseIndex) => {
      course.schedule.forEach(scheduleItem => {
        const startTime = parseTime(scheduleItem.time);
        events.push({
          course: course,
          day: scheduleItem.day,
          time: startTime,
          timeRange: scheduleItem.time,
          location: scheduleItem.location,
          color: getColorForCourse(courseIndex)
        });
      });
    });
    return events;
  };

  const events = getTimetableEvents();

  const getEventsForDayAndTime = (day, time) => {
    return events.filter(event => event.day === day && event.time === time);
  };

  const upcomingHolidays = publicHolidays.filter(ph => new Date(ph.date) > new Date());

  // Detect time clashes
  const detectClashes = () => {
    const clashes = [];
    const timeSlotMap = {};

    events.forEach(event => {
      const key = `${event.day}-${event.time}`;
      if (!timeSlotMap[key]) {
        timeSlotMap[key] = [];
      }
      timeSlotMap[key].push(event.course.id);
    });

    Object.entries(timeSlotMap).forEach(([key, courses]) => {
      if (courses.length > 1) {
        const [day, time] = key.split('-');
        clashes.push({ day, time, courses });
      }
    });

    return clashes;
  };

  const clashes = detectClashes();

  // Calculate total workload
  const getTotalWorkload = () => {
    let quizzes = 0, exams = 0, projects = 0, assignments = 0;

    cart.forEach(course => {
      course.assessments.forEach(assessment => {
        const type = assessment.type.toLowerCase();
        if (type.includes('quiz')) quizzes++;
        else if (type.includes('exam')) exams++;
        else if (type.includes('project')) projects++;
        else if (type.includes('assignment') || type.includes('lab')) assignments++;
      });
    });

    return { quizzes, exams, projects, assignments };
  };

  const workload = getTotalWorkload();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">My Timetable</h1>
        <p className="text-gray-600">Auto-generated from your course cart</p>
      </div>

      {/* Info Banner */}
      {cart.length === 0 ? (
        <div className="alert-warning">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">No Courses in Cart</h3>
              <p className="text-sm text-yellow-800">
                Add courses to your cart to see them appear in your timetable automatically.
              </p>
            </div>
          </div>
        </div>
      ) : clashes.length > 0 ? (
        <div className="alert-error">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">⚠️ Time Clash Detected!</h3>
              <p className="text-sm text-red-800 mb-2">
                Some of your courses have overlapping schedules:
              </p>
              <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                {clashes.map((clash, i) => (
                  <li key={i}>
                    <span className="font-semibold">{clash.day} {clash.time}</span>: {clash.courses.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert-success">
          <div className="flex items-start">
            <CalendarIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">✅ Timetable Generated</h3>
              <p className="text-sm text-green-800">
                Your timetable has been auto-generated with {cart.length} courses. No time conflicts detected!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Public Holidays Notice */}
      {upcomingHolidays.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Upcoming Public Holidays</h3>
              <div className="space-y-1">
                {upcomingHolidays.slice(0, 3).map((holiday, i) => (
                  <p key={i} className="text-sm text-blue-800">
                    <span className="font-medium">{holiday.name}</span> - {new Date(holiday.date).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                ))}
              </div>
              <p className="text-xs text-blue-700 mt-2">Classes may be rescheduled. Check with your professors.</p>
            </div>
          </div>
        </div>
      )}

      {/* Course Legend */}
      {cart.length > 0 && (
        <div className="mb-6 fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cart.map((course, index) => (
              <div key={course.id} className={`card-hover-lift p-3 rounded-lg border-2 ${getColorForCourse(index)}`}>
                <div className="font-semibold">{course.id}</div>
                <div className="text-sm">{course.name}</div>
                <div className="text-xs mt-1">{course.professor}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Grid */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-smu-blue text-white">
              <th className="border border-gray-300 p-3 text-left w-24">Time</th>
              {days.map(day => (
                <th key={day} className="border border-gray-300 p-3 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 font-mono text-sm text-gray-600">
                  {time}
                </td>
                {days.map(day => {
                  const dayEvents = getEventsForDayAndTime(day, time);
                  return (
                    <td key={`${day}-${time}`} className="border border-gray-300 p-2 align-top">
                      {dayEvents.map((event, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded border-l-4 mb-1 ${event.color}`}
                        >
                          <div className="font-bold text-sm">{event.course.id}</div>
                          <div className="text-xs">{event.timeRange}</div>
                          <div className="text-xs mt-1">{event.location}</div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weekly Summary & Total Workload */}
      {cart.length > 0 && (
        <div className="mt-6 space-y-6 slide-up">
          {/* Course & Credit Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Course Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat-card bg-blue-50">
                <p className="text-2xl font-bold text-smu-blue">{cart.length}</p>
                <p className="text-sm text-gray-600">Total Courses</p>
              </div>
              <div className="stat-card bg-green-50">
                <p className="text-2xl font-bold text-green-600">
                  {cart.reduce((sum, course) => sum + course.credits, 0).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Total Credits</p>
              </div>
              <div className="stat-card bg-purple-50">
                <p className="text-2xl font-bold text-purple-600">{events.length}</p>
                <p className="text-sm text-gray-600">Weekly Sessions</p>
              </div>
            </div>
          </div>

          {/* Total Workload Overview */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Semester Workload Overview</h3>
            <p className="text-sm text-gray-600 mb-4">
              This semester you will have a total of:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg text-center border border-orange-200">
                <p className="text-3xl font-bold text-orange-600">{workload.quizzes}</p>
                <p className="text-sm text-gray-600 mt-1">Quizzes</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center border border-red-200">
                <p className="text-3xl font-bold text-red-600">{workload.exams}</p>
                <p className="text-sm text-gray-600 mt-1">Exams</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center border border-purple-200">
                <p className="text-3xl font-bold text-purple-600">{workload.projects}</p>
                <p className="text-sm text-gray-600 mt-1">Projects</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center border border-blue-200">
                <p className="text-3xl font-bold text-blue-600">{workload.assignments}</p>
                <p className="text-sm text-gray-600 mt-1">Assignments</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border border-orange-300">
              <p className="text-sm text-orange-900">
                <span className="font-semibold">💡 Tip:</span> Check the Assessment Timeline page to see when these assessments are due and identify potential "hell weeks"!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timetable;
