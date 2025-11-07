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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">My Timetable</h1>
        <p className="text-gray-600">Auto-generated from your course cart</p>
      </div>

      {/* Info Banner */}
      {cart.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
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
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <CalendarIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Timetable Generated</h3>
              <p className="text-sm text-green-800">
                Your timetable has been auto-generated with {cart.length} courses. Check for time conflicts below.
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cart.map((course, index) => (
              <div key={course.id} className={`p-3 rounded-lg border-2 ${getColorForCourse(index)}`}>
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

      {/* Weekly Summary */}
      {cart.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-smu-blue">{cart.length}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {cart.reduce((sum, course) => sum + course.credits, 0).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Total Credits</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{events.length}</p>
              <p className="text-sm text-gray-600">Weekly Sessions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timetable;
