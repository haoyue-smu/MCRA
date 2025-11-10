import { useState } from 'react';
import { Brain, Sparkles, Target, TrendingUp, CheckCircle, AlertCircle, Settings, Lightbulb, Info } from 'lucide-react';
import { courses } from '../data/mockData';

function AIRecommender({ cart, addToCart }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedConstraints, setSelectedConstraints] = useState([]);
  const [priorities, setPriorities] = useState({
    academicExcellence: 50,
    careerPreparation: 50,
    workLifeBalance: 50
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Organized interests by category
  const interestCategories = {
    technical: {
      title: 'Technical Skills',
      icon: '🔧',
      interests: [
        'Web Development',
        'Mobile Development',
        'Database Management',
        'Cloud Computing',
        'DevOps'
      ]
    },
    business: {
      title: 'Business & Analytics',
      icon: '📊',
      interests: [
        'Data Science',
        'Business Analysis',
        'Cybersecurity',
        'Project Management',
        'Digital Marketing'
      ]
    },
    emerging: {
      title: 'Emerging Technologies',
      icon: '🚀',
      interests: [
        'Artificial Intelligence',
        'Machine Learning',
        'Blockchain',
        'IoT',
        'Quantum Computing'
      ]
    }
  };

  const goals = [
    'Graduate on time',
    'Maximize GPA',
    'Build practical skills',
    'Prepare for specific career',
    'Complete degree requirements',
    'Minimize workload',
    'Learn from best professors',
    'Study abroad preparation',
    'Internship readiness',
    'Double major/minor'
  ];

  const constraints = [
    'Avoid morning classes (before 9am)',
    'Include S/U eligible courses',
    'No Friday classes',
    'Consider bidding difficulty',
    'Maximum 4 courses per term',
    'Prefer project-based courses',
    'Avoid heavy coding courses',
    'Include internship opportunities'
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleGoal = (goal) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleConstraint = (constraint) => {
    setSelectedConstraints(prev =>
      prev.includes(constraint)
        ? prev.filter(c => c !== constraint)
        : [...prev, constraint]
    );
  };

  const handlePriorityChange = (key, value) => {
    setPriorities(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const generateRecommendations = () => {
    // Simulated AI recommendations based on interests, goals, and constraints
    let scored = courses.map(course => {
      let score = 0;
      let reasons = [];

      // Interest-based scoring
      if (selectedInterests.includes('Web Development') &&
          (course.id === 'IS216' || course.skills.some(s => s.includes('JavaScript') || s.includes('React')))) {
        score += 30;
        reasons.push('Matches your interest in Web Development');
      }

      if (selectedInterests.includes('Data Science') &&
          (course.id === 'IS445' || course.id === 'IS112' || course.skills.some(s => s.includes('Python') || s.includes('SQL')))) {
        score += 30;
        reasons.push('Relevant to Data Science career path');
      }

      if (selectedInterests.includes('Artificial Intelligence') && course.id === 'IS445') {
        score += 35;
        reasons.push('Core AI/ML course');
      }

      if (selectedInterests.includes('Machine Learning') && course.id === 'IS445') {
        score += 35;
        reasons.push('Specialized ML content');
      }

      if (selectedInterests.includes('Business Analysis') && course.id === 'IS210') {
        score += 30;
        reasons.push('Essential for Business Analysis');
      }

      if (selectedInterests.includes('Cybersecurity') && course.id === 'IS424') {
        score += 35;
        reasons.push('Core security course');
      }

      if (selectedInterests.includes('Cloud Computing') && course.id === 'IS442') {
        score += 35;
        reasons.push('Comprehensive cloud engineering course');
      }

      if (selectedInterests.includes('Mobile Development') && course.id === 'IS315') {
        score += 35;
        reasons.push('Cross-platform mobile development');
      }

      if (selectedInterests.includes('Database Management') && (course.id === 'IS112' || course.id === 'IS214')) {
        score += 30;
        reasons.push('Strong database focus');
      }

      // Goal-based scoring with priorities
      if (selectedGoals.includes('Maximize GPA')) {
        const gpaWeight = priorities.academicExcellence / 100;
        if (course.difficulty <= 3) {
          score += 15 * gpaWeight;
          reasons.push('Manageable difficulty level');
        }
        if (course.afterClassRating >= 4.5) {
          score += 10 * gpaWeight;
          reasons.push('Highly rated by students');
        }
      }

      if (selectedGoals.includes('Build practical skills')) {
        const careerWeight = priorities.careerPreparation / 100;
        if (course.tags?.includes('Project-Heavy') || course.assessments.some(a => a.type.includes('Project'))) {
          score += 20 * careerWeight;
          reasons.push('Hands-on project-based learning');
        }
      }

      if (selectedGoals.includes('Learn from best professors')) {
        if (course.afterClassRating >= 4.5) {
          score += 25;
          reasons.push(`Excellent professor rating (${course.afterClassRating}/5.0)`);
        }
      }

      if (selectedGoals.includes('Minimize workload')) {
        const balanceWeight = priorities.workLifeBalance / 100;
        if (course.difficulty <= 3) {
          score += 20 * balanceWeight;
          reasons.push('Reasonable workload');
        }
      }

      if (selectedGoals.includes('Prepare for specific career')) {
        const careerWeight = priorities.careerPreparation / 100;
        if (course.careerPaths?.length > 0) {
          score += 15 * careerWeight;
          reasons.push('Strong career path alignment');
        }
      }

      // Constraint-based adjustments
      if (selectedConstraints.includes('Include S/U eligible courses') && course.suEligible) {
        score += 10;
        reasons.push('S/U eligible');
      }

      if (selectedConstraints.includes('Prefer project-based courses') &&
          course.tags?.includes('Project-Heavy')) {
        score += 15;
        reasons.push('Project-based learning');
      }

      if (selectedConstraints.includes('Avoid heavy coding courses') &&
          !course.tags?.includes('Programming')) {
        score += 10;
      }

      if (selectedConstraints.includes('Consider bidding difficulty') &&
          course.yearlyAverage <= 28) {
        score += 10;
        reasons.push('Lower bidding competition');
      }

      // Prerequisites check
      const hasPrereqs = course.prerequisites.every(preqId =>
        cart.some(c => c.id === preqId) || courses.some(c => c.id === preqId)
      );

      if (!hasPrereqs && course.prerequisites.length > 0) {
        score -= 50;
        reasons.push('Prerequisites not yet completed');
      }

      // Already in cart
      if (cart.some(c => c.id === course.id)) {
        score = 0;
        reasons = ['Already in your cart'];
      }

      return {
        course,
        score,
        reasons
      };
    });

    // Sort by score and take top 6
    scored = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    setRecommendations(scored);
    setShowResults(true);
  };

  const getConfidenceLevel = (score) => {
    if (score >= 70) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 50) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const renderProgressIndicator = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                currentStep >= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              <div className="ml-3">
                <div className={`text-sm font-semibold ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step === 1 ? 'Interests' : step === 2 ? 'Goals' : 'Constraints'}
                </div>
              </div>
            </div>
            {step < 3 && (
              <div className={`flex-1 h-1 mx-4 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600">
        Step {currentStep} of 3
      </div>
    </div>
  );

  return (
    <div className="w-full px-20 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3" />
          AI Course Recommender
        </h1>
        <p className="text-gray-600">Get personalized course suggestions powered by AI</p>
      </div>

      {!showResults ? (
        <>
          {/* Progress Indicator */}
          {renderProgressIndicator()}

          {/* Pro Tip Box */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-yellow-900">💡 Pro Tip:</span>
              <span className="text-yellow-800 ml-2">Select 3-5 interests for best results</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-900">📊 Note:</span>
              <span className="text-blue-800 ml-2">AI will consider prerequisites and availability</span>
            </div>
          </div>

          {/* Section 1 - Interests */}
          {currentStep >= 1 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What are your interests?</h2>
              <p className="text-sm text-gray-600 mb-6">Select all areas that interest you</p>

              {Object.entries(interestCategories).map(([key, category]) => (
                <div key={key} className="mb-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">{category.icon}</span>
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {category.interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          selectedInterests.includes(interest)
                            ? 'bg-blue-600 text-white border-blue-600 transform scale-105 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:scale-105'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Next: Goals →
                </button>
              </div>
            </div>
          )}

          {/* Section 2 - Goals */}
          {currentStep >= 2 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What are your goals?</h2>
              <p className="text-sm text-gray-600 mb-6">Help us understand your priorities</p>

              {/* Goal Tags */}
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {goals.map(goal => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                        selectedGoals.includes(goal)
                          ? 'bg-blue-600 text-white border-blue-600 transform scale-105 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:scale-105'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Sliders */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4">Priority Levels</h3>

                {/* Academic Excellence */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Academic Excellence (GPA)</label>
                    <span className="text-lg font-bold text-blue-600">{priorities.academicExcellence}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priorities.academicExcellence}
                    onChange={(e) => handlePriorityChange('academicExcellence', e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Career Preparation */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Career Preparation</label>
                    <span className="text-lg font-bold text-green-600">{priorities.careerPreparation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priorities.careerPreparation}
                    onChange={(e) => handlePriorityChange('careerPreparation', e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                {/* Work-Life Balance */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Work-Life Balance</label>
                    <span className="text-lg font-bold text-purple-600">{priorities.workLifeBalance}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priorities.workLifeBalance}
                    onChange={(e) => handlePriorityChange('workLifeBalance', e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Next: Constraints →
                </button>
              </div>
            </div>
          )}

          {/* Section 3 - Constraints */}
          {currentStep >= 3 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Additional Constraints (Optional)</h2>
              <p className="text-sm text-gray-600 mb-6">Any scheduling or course preferences?</p>

              <div className="space-y-3">
                {constraints.map(constraint => (
                  <label
                    key={constraint}
                    className="flex items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-300 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConstraints.includes(constraint)}
                      onChange={() => toggleConstraint(constraint)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{constraint}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* Generate Button */}
          {currentStep === 3 && (
            <div className="text-center">
              <button
                onClick={generateRecommendations}
                disabled={selectedInterests.length === 0 && selectedGoals.length === 0}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center mx-auto ${
                  selectedInterests.length === 0 && selectedGoals.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                ✨ Generate AI Recommendations
              </button>
              {selectedInterests.length === 0 && selectedGoals.length === 0 && (
                <p className="text-sm text-gray-500 mt-3">Please select at least one interest or goal</p>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Results Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Personalized Recommendations</h2>
                <p className="text-purple-100">
                  Based on {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''},{' '}
                  {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''}, and{' '}
                  {selectedConstraints.length} constraint{selectedConstraints.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                }}
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>

          {/* Recommendations Grid */}
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map(({ course, score, reasons }, index) => {
                const confidence = getConfidenceLevel(score);
                const isInCart = cart.some(c => c.id === course.id);

                return (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${confidence.bg} ${confidence.color}`}>
                            {confidence.level} Match
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-smu-blue mb-1">{course.id}</h3>
                        <h4 className="text-md font-semibold text-gray-900 mb-1">{course.name}</h4>
                        <p className="text-sm text-gray-600">{course.professor}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Match Score</span>
                        <span className="text-lg font-bold text-purple-600">{Math.round(score)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                          style={{ width: `${Math.min(score, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Why this course?</h4>
                      <ul className="space-y-1">
                        {reasons.slice(0, 4).map((reason, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Rating</p>
                        <p className="font-semibold text-gray-900">{course.afterClassRating}/5.0</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Difficulty</p>
                        <p className="font-semibold text-gray-900">{course.difficulty}/5</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Demand</p>
                        <p className="font-semibold text-gray-900">{course.demand}</p>
                      </div>
                    </div>

                    {isInCart ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <span className="text-sm text-green-700 font-semibold flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Already in Cart
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(course.id)}
                        className="w-full bg-smu-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">No Recommendations Found</h3>
              <p className="text-sm text-yellow-800 mb-4">
                We couldn't find courses matching your criteria. Try selecting different interests or goals.
              </p>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                }}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AIRecommender;
