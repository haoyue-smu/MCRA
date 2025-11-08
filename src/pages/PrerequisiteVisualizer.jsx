import { useState } from 'react';
import { GitBranch, Search, CheckCircle, Lock, AlertCircle, ArrowDown, ArrowRight } from 'lucide-react';
import { courses } from '../data/mockData';

function PrerequisiteVisualizer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('chain'); // 'chain' or 'tree'

  const findPrerequisiteChain = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return [];

    const chain = [course];
    let current = course;

    while (current.prerequisites && current.prerequisites.length > 0) {
      const prereqId = current.prerequisites[0]; // Take first prerequisite for chain
      const prereq = courses.find(c => c.id === prereqId);
      if (prereq) {
        chain.unshift(prereq);
        current = prereq;
      } else {
        break;
      }
    }

    return chain;
  };

  const findDependentCourses = (courseId) => {
    return courses.filter(c => c.prerequisites.includes(courseId));
  };

  const getAllPrerequisites = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.prerequisites || course.prerequisites.length === 0) return [];

    const allPrereqs = [];
    course.prerequisites.forEach(preqId => {
      const prereq = courses.find(c => c.id === preqId);
      if (prereq) {
        allPrereqs.push(prereq);
        allPrereqs.push(...getAllPrerequisites(preqId));
      }
    });

    return allPrereqs;
  };

  const filteredCourses = courses.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CourseCard = ({ course, type = 'normal', onClick }) => {
    const dependents = findDependentCourses(course.id);

    const colorMap = {
      prerequisite: 'bg-blue-100 border-blue-400 text-blue-900',
      current: 'bg-yellow-100 border-yellow-500 text-yellow-900 ring-2 ring-yellow-500',
      dependent: 'bg-green-100 border-green-400 text-green-900',
      normal: 'bg-white border-gray-300 text-gray-900'
    };

    return (
      <div
        onClick={() => onClick && onClick(course)}
        className={`${colorMap[type]} border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-bold text-lg">{course.id}</div>
            <div className="text-sm mt-1">{course.name}</div>
            <div className="text-xs mt-2 opacity-75">{course.professor}</div>
          </div>
          <div className="flex flex-col gap-1">
            {course.prerequisites.length > 0 && (
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                {course.prerequisites.length} prereq
              </span>
            )}
            {dependents.length > 0 && (
              <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                {dependents.length} unlock{dependents.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">Prerequisite Visualizer</h1>
        <p className="text-gray-600">Understand course dependencies and plan your academic journey</p>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded mr-2"></div>
            <span>Prerequisites (must complete first)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded mr-2"></div>
            <span>Selected Course</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded mr-2"></div>
            <span>Unlocked Courses (can take after)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Courses</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  type={selectedCourse?.id === course.id ? 'current' : 'normal'}
                  onClick={setSelectedCourse}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Course Path for {selectedCourse.id}
              </h3>

              {/* Prerequisite Chain */}
              {selectedCourse.prerequisites.length > 0 ? (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-blue-700 mb-4 flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Prerequisites (Complete These First)
                  </h4>
                  <div className="space-y-3">
                    {getAllPrerequisites(selectedCourse.id).reverse().map((prereq, index) => (
                      <div key={prereq.id}>
                        <CourseCard course={prereq} type="prerequisite" onClick={setSelectedCourse} />
                        <div className="flex justify-center my-2">
                          <ArrowDown className="w-6 h-6 text-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">No prerequisites required - you can take this course immediately!</span>
                  </div>
                </div>
              )}

              {/* Current Course */}
              <div className="mb-8">
                <CourseCard course={selectedCourse} type="current" />
              </div>

              {/* Dependent Courses */}
              {findDependentCourses(selectedCourse.id).length > 0 ? (
                <div>
                  <div className="flex justify-center mb-4">
                    <ArrowDown className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-green-700 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Unlocks These Courses
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {findDependentCourses(selectedCourse.id).map(dependent => (
                      <CourseCard
                        key={dependent.id}
                        course={dependent}
                        type="dependent"
                        onClick={setSelectedCourse}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center text-gray-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">This course is not a prerequisite for any other courses</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Course</h3>
              <p className="text-gray-600">
                Click on any course from the list to view its prerequisite path and dependencies
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrerequisiteVisualizer;
