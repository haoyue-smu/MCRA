import { useState } from 'react';
import { GitBranch, Search, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import { courses } from '../data/mockData';

function PrerequisiteVisualizer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const findCoursePath = (courseId, visited = new Set()) => {
    if (visited.has(courseId)) return null;
    visited.add(courseId);

    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    return {
      ...course,
      prerequisites: course.prerequisites.map(preqId => findCoursePath(preqId, visited)).filter(Boolean)
    };
  };

  const findDependentCourses = (courseId) => {
    return courses.filter(c => c.prerequisites.includes(courseId));
  };

  const filteredCourses = courses.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TreeNode = ({ course, level = 0, isPrerequisite = true }) => {
    const dependents = findDependentCourses(course.id);
    const indent = level * 40;

    return (
      <div className="mb-2">
        <div
          className={`flex items-start p-3 rounded-lg border-l-4 cursor-pointer transition-all ${
            isPrerequisite
              ? 'bg-blue-50 border-blue-500 hover:bg-blue-100'
              : 'bg-green-50 border-green-500 hover:bg-green-100'
          }`}
          style={{ marginLeft: `${indent}px` }}
          onClick={() => setSelectedCourse(course)}
        >
          <div className="mr-3 mt-1">
            {isPrerequisite ? (
              <Lock className="w-5 h-5 text-blue-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{course.id}</div>
            <div className="text-sm text-gray-600">{course.name}</div>
            <div className="text-xs text-gray-500 mt-1">{course.professor}</div>
            {level === 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {course.prerequisites.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {course.prerequisites.length} prerequisite{course.prerequisites.length > 1 ? 's' : ''}
                  </span>
                )}
                {dependents.length > 0 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Required for {dependents.length} course{dependents.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="mt-2">
            {course.prerequisites.map((prereq) => (
              <TreeNode key={prereq.id} course={prereq} level={level + 1} isPrerequisite={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const DependencyView = ({ course }) => {
    const dependents = findDependentCourses(course.id);

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-smu-blue mb-4">Course Details</h3>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Course Code:</span> {course.id}
            </div>
            <div>
              <span className="font-semibold">Name:</span> {course.name}
            </div>
            <div>
              <span className="font-semibold">Professor:</span> {course.professor}
            </div>
            <div>
              <span className="font-semibold">Credits:</span> {course.credits} CU
            </div>
          </div>
        </div>

        {course.prerequisites.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Prerequisites Required
            </h3>
            <div className="space-y-2">
              {course.prerequisites.map(preqId => {
                const prereqCourse = courses.find(c => c.id === preqId);
                return prereqCourse ? (
                  <div key={preqId} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                    <div>
                      <div className="font-semibold text-gray-900">{prereqCourse.id}</div>
                      <div className="text-sm text-gray-600">{prereqCourse.name}</div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {dependents.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
              <GitBranch className="w-5 h-5 mr-2" />
              Unlocks These Courses
            </h3>
            <div className="space-y-2">
              {dependents.map(depCourse => (
                <div key={depCourse.id} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <div>
                    <div className="font-semibold text-gray-900">{depCourse.id}</div>
                    <div className="text-sm text-gray-600">{depCourse.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {course.prerequisites.length === 0 && dependents.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">No Dependencies</h3>
                <p className="text-sm text-yellow-800">
                  This course has no prerequisites and is not required for other courses.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">Prerequisite Visualizer</h1>
        <p className="text-gray-600">Interactive course dependency tree and pathway planning</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <GitBranch className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Course Dependency Guide</h3>
            <p className="text-sm text-blue-800">
              Blue boxes indicate prerequisites (courses you need to complete first).
              Green boxes show courses that will be unlocked after completing this course.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Course List */}
        <div>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Course List */}
          <div className="bg-white rounded-lg shadow-md p-4 max-h-[600px] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">All Courses</h3>
            <div className="space-y-2">
              {filteredCourses.map(course => {
                const pathData = findCoursePath(course.id);
                return pathData ? <TreeNode key={course.id} course={pathData} /> : null;
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed View */}
        <div>
          {selectedCourse ? (
            <DependencyView course={selectedCourse} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a course to view its prerequisites and dependencies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrerequisiteVisualizer;
