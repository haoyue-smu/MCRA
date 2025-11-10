import { useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, Users, Target, Award, ExternalLink } from 'lucide-react';
import { careerPaths, courses } from '../data/mockData';

function CareerPathway({ cart }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const getSkillsFromCart = () => {
    const skills = new Set();
    cart.forEach(course => {
      course.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills);
  };

  const getMatchScore = (path) => {
    const cartSkills = getSkillsFromCart();
    if (cartSkills.length === 0) return 0;

    const matchingSkills = path.requiredSkills.filter(skill =>
      cartSkills.some(cartSkill => cartSkill.toLowerCase().includes(skill.toLowerCase()))
    );

    return Math.round((matchingSkills.length / path.requiredSkills.length) * 100);
  };

  const getRecommendedCourses = (path) => {
    return path.recommendedCourses
      .map(courseId => courses.find(c => c.id === courseId))
      .filter(Boolean);
  };

  const getMissingSkills = (path) => {
    const cartSkills = getSkillsFromCart();
    return path.requiredSkills.filter(skill =>
      !cartSkills.some(cartSkill => cartSkill.toLowerCase().includes(skill.toLowerCase()))
    );
  };

  const PathCard = ({ path }) => {
    const matchScore = getMatchScore(path);
    const isGoodMatch = matchScore >= 60;

    return (
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
        onClick={() => setSelectedPath(path)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="bg-smu-blue p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{path.description}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Skill Match</span>
            <span className={`text-sm font-bold ${isGoodMatch ? 'text-green-600' : 'text-orange-600'}`}>
              {matchScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${isGoodMatch ? 'bg-green-600' : 'bg-orange-600'}`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-smu-gold" />
            <span className="text-gray-700">{path.averageSalary}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">{path.jobOpenings} openings</span>
          </div>
          <div className="flex items-center space-x-2 text-sm col-span-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">{path.growthRate} growth rate</span>
          </div>
        </div>

        {isGoodMatch && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-2 text-center">
            <span className="text-sm text-green-700 font-semibold flex items-center justify-center">
              <Target className="w-4 h-4 mr-1" />
              Great Match!
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">Career Pathways</h1>
        <p className="text-gray-600">Connect your courses to career goals and job opportunities</p>
      </div>

      {/* Skills Overview */}
      {cart.length > 0 && (
        <div className="bg-gradient-to-r from-smu-blue to-blue-700 rounded-lg shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center mb-4">
            <Award className="w-8 h-8 text-smu-gold mr-3" />
            <h2 className="text-2xl font-bold">Your Current Skill Profile</h2>
          </div>
          <p className="mb-4">Based on the {cart.length} courses in your cart:</p>
          <div className="flex flex-wrap gap-2">
            {getSkillsFromCart().map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {cart.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Add courses to your cart to see personalized career pathway recommendations based on the skills you'll gain.
          </p>
        </div>
      )}

      {/* Career Paths Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Career Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerPaths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </div>

      {/* Detailed Path View */}
      {selectedPath && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPath(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-smu-blue mb-2">{selectedPath.title}</h2>
                  <p className="text-gray-600">{selectedPath.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPath(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-6 h-6" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Average Salary</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">{selectedPath.averageSalary}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Job Openings</span>
                  </div>
                  <p className="text-xl font-bold text-blue-600">{selectedPath.jobOpenings}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">Growth Rate</span>
                  </div>
                  <p className="text-xl font-bold text-purple-600">{selectedPath.growthRate}</p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.requiredSkills.map((skill, i) => {
                    const hasSkill = getSkillsFromCart().some(s =>
                      s.toLowerCase().includes(skill.toLowerCase())
                    );
                    return (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          hasSkill
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {skill}
                        {hasSkill && ' ✓'}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Missing Skills */}
              {getMissingSkills(selectedPath).length > 0 && (
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Skills to Develop</h3>
                  <p className="text-sm text-orange-800 mb-3">
                    Consider taking additional courses to gain these skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getMissingSkills(selectedPath).map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-orange-700 rounded-full text-sm font-medium border border-orange-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Courses */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Courses</h3>
                <div className="space-y-3">
                  {getRecommendedCourses(selectedPath).map(course => {
                    const isInCart = cart.some(c => c.id === course.id);
                    return (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{course.id} - {course.name}</div>
                          <div className="text-sm text-gray-600">{course.professor}</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {course.skills.map((skill, i) => (
                              <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {isInCart && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            In Cart ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OnTrac Integration Mock */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">OnTrac Job Opportunities</h3>
                    <p className="text-sm text-gray-600">Current openings matching this career path</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-semibold text-gray-900">{selectedPath.title} Intern</div>
                      <div className="text-sm text-gray-600">Tech Company {i} • Singapore</div>
                      <div className="text-sm text-indigo-600 mt-2 cursor-pointer hover:underline">View on OnTrac →</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerPathway;
