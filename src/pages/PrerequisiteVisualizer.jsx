import { useState } from 'react';
import { GitBranch, Search, CheckCircle, Lock, AlertCircle, ArrowDown, ArrowRight, Clock, X } from 'lucide-react';
import { courses, programRequirements } from '../data/mockData';
import PageContainer from '../components/PageContainer';

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

  // Get course status from program requirements
  const getCourseStatus = (courseId) => {
    for (const category of programRequirements) {
      const module = category.modules.find(m => m.id === courseId);
      if (module) {
        return module.status; // 'completed', 'in_cart', 'pending'
      }
    }
    return 'pending';
  };

  // Get all direct prerequisites
  const getDirectPrerequisites = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.prerequisites || course.prerequisites.length === 0) return [];

    return course.prerequisites.map(preqId => courses.find(c => c.id === preqId)).filter(Boolean);
  };

  // Get all indirect prerequisites (prerequisites of prerequisites)
  const getIndirectPrerequisites = (courseId) => {
    const directPrereqs = getDirectPrerequisites(courseId);
    const indirectPrereqs = [];

    directPrereqs.forEach(prereq => {
      const prereqPrereqs = getAllPrerequisites(prereq.id);
      prereqPrereqs.forEach(p => {
        if (!indirectPrereqs.find(ip => ip.id === p.id) && !directPrereqs.find(dp => dp.id === p.id)) {
          indirectPrereqs.push(p);
        }
      });
    });

    return indirectPrereqs;
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

  // Check if all prerequisites are satisfied
  const arePrerequisitesSatisfied = (courseId) => {
    const allPrereqs = [...getDirectPrerequisites(courseId), ...getIndirectPrerequisites(courseId)];
    return allPrereqs.every(prereq => getCourseStatus(prereq.id) === 'completed');
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
          <div className="flex flex-col gap-2 items-end">
            {course.prerequisites.length > 0 && (
              <span className="inline-flex items-center justify-center h-6 px-3 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full border border-blue-300 whitespace-nowrap min-w-[76px]">
                {course.prerequisites.length} prereq{course.prerequisites.length > 1 ? 's' : ''}
              </span>
            )}
            {dependents.length > 0 && (
              <span className="inline-flex items-center justify-center h-6 px-3 text-xs font-semibold bg-green-100 text-green-700 rounded-full border border-green-300 whitespace-nowrap min-w-[76px]">
                {dependents.length} unlock{dependents.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PrerequisiteItem = ({ course }) => {
    const status = getCourseStatus(course.id);
    const statusConfig = {
      completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed', date: 'T2 2024' },
      in_cart: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', label: 'In Progress', date: null },
      pending: { icon: X, color: 'text-red-600', bg: 'bg-red-50', label: 'Not Taken', date: null }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const StatusIcon = config.icon;

    return (
      <div className={`${config.bg} border-2 border-gray-200 rounded-lg p-3 flex items-start justify-between`}>
        <div className="flex items-start gap-3 flex-1">
          <StatusIcon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{course.id} - {course.name}</div>
            <div className="text-xs text-gray-600 mt-1">{course.professor}</div>
            {config.date && (
              <div className="text-xs text-gray-500 mt-1">Completed: {config.date}</div>
            )}
          </div>
        </div>
        <span className={`text-xs font-medium ${config.color} whitespace-nowrap ml-2`}>{config.label}</span>
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
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
            <div className="space-y-6">
              {/* Course Header */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedCourse.id} - {selectedCourse.name}
                </h3>
                <p className="text-sm text-gray-600">{selectedCourse.professor}</p>
              </div>

              {/* Prerequisites Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Prerequisites Status
                </h3>

                {selectedCourse.prerequisites.length === 0 ? (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-semibold">✓ No prerequisites required!</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1 ml-7">
                      This is a foundation course - you can take it immediately!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Summary Message */}
                    <div className={`p-3 ${arePrerequisitesSatisfied(selectedCourse.id) ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border-2 rounded-lg mb-4`}>
                      <div className={`flex items-center ${arePrerequisitesSatisfied(selectedCourse.id) ? 'text-green-700' : 'text-orange-700'}`}>
                        {arePrerequisitesSatisfied(selectedCourse.id) ? (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 mr-2" />
                        )}
                        <span className="text-sm font-semibold">
                          {arePrerequisitesSatisfied(selectedCourse.id) ? '✓ All requirements satisfied' : '⚠️ Prerequisites incomplete'}
                        </span>
                      </div>
                    </div>

                    {/* Direct Requirements */}
                    {getDirectPrerequisites(selectedCourse.id).length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-blue-700 mb-3">Direct Requirements</h4>
                        <div className="space-y-2">
                          {getDirectPrerequisites(selectedCourse.id).map(prereq => (
                            <PrerequisiteItem key={prereq.id} course={prereq} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Indirect Requirements */}
                    {getIndirectPrerequisites(selectedCourse.id).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-700 mb-3">Indirect Requirements</h4>
                        <div className="space-y-2">
                          {getIndirectPrerequisites(selectedCourse.id).map(prereq => (
                            <PrerequisiteItem key={prereq.id} course={prereq} />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Unlocks Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Unlocks
                </h3>

                {findDependentCourses(selectedCourse.id).length === 0 ? (
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center text-gray-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">This is a terminal course</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-7">
                      No other courses require this as a prerequisite
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg mb-4">
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Foundation course:</span> Completing this will unlock {findDependentCourses(selectedCourse.id).length} course{findDependentCourses(selectedCourse.id).length > 1 ? 's' : ''}!
                      </p>
                    </div>
                    <div className="space-y-2">
                      {findDependentCourses(selectedCourse.id).map(dependent => (
                        <div
                          key={dependent.id}
                          onClick={() => setSelectedCourse(dependent)}
                          className="flex items-start p-3 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 cursor-pointer transition-all"
                        >
                          <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mr-2 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900">{dependent.id} - {dependent.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{dependent.professor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Course</h3>
              <p className="text-gray-600">
                Click on any course from the list to view its prerequisite requirements and unlocks
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default PrerequisiteVisualizer;
