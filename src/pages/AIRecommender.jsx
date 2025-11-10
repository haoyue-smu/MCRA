import { useState } from 'react';
import { Brain, Sparkles, Target, TrendingUp, CheckCircle, AlertCircle, Settings, Lightbulb, Info, ArrowLeft, ArrowRight, Edit2, ChevronRight } from 'lucide-react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Organized interests by category
  const interestCategories = {
    technical: {
      title: 'Technical Skills',
      icon: '💻',
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

  const navigateToStep = (step) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      navigateToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigateToStep(currentStep - 1);
    }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getConfidenceLevel = (score) => {
    if (score >= 70) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 50) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  // Modern Progress Indicator Component with Enhanced Visual Hierarchy
  const renderProgressIndicator = () => {
    const steps = [
      { num: 1, label: 'Interests', desc: 'What interests you?' },
      { num: 2, label: 'Goals', desc: 'What are your priorities?' },
      { num: 3, label: 'Constraints', desc: 'Any preferences?' },
      { num: 4, label: 'Review', desc: 'Review & generate' }
    ];

    const circleSize = 44;
    const lineThickness = 3;
    const progressPercent =
      steps.length > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8" style={{ minHeight: 120 }}>
        <div
          className="relative px-8"
          style={{ paddingTop: circleSize + 24, paddingBottom: 24 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              left: circleSize / 2,
              right: circleSize / 2,
              top: circleSize / 2 + 16,
              height: lineThickness,
              background: `linear-gradient(to right, #10b981 ${progressPercent}%, #e0e0e0 ${progressPercent}%)`
            }}
          />

          <div className="relative flex justify-between">
            {steps.map((step) => {
              const state =
                step.num < currentStep
                  ? 'complete'
                  : step.num === currentStep
                  ? 'active'
                  : 'inactive';

              const circleStyles = {
                backgroundColor:
                  state === 'complete'
                    ? '#10b981'
                    : state === 'active'
                    ? '#3b82f6'
                    : '#e5e7eb',
                color: state === 'inactive' ? '#475569' : '#ffffff',
                fontSize: 18,
                boxShadow:
                  state === 'inactive'
                    ? 'none'
                    : state === 'complete'
                    ? '0 10px 20px rgba(16, 185, 129, 0.18)'
                    : '0 10px 20px rgba(59, 130, 246, 0.18)'
              };

              return (
                <div
                  key={step.num}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className="flex items-center justify-center rounded-full border-[3px] border-white shadow-sm relative z-10 font-semibold"
                    style={{
                      width: circleSize,
                      height: circleSize,
                      ...circleStyles
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-gray-900">
                      {step.label}
                    </div>
                    <div className="text-sm text-gray-500">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Navigation Buttons Component
  const renderNavigation = () => {
    const canProceed = () => {
      if (currentStep === 1) return selectedInterests.length > 0;
      if (currentStep === 2) return selectedGoals.length > 0;
      return true; // Step 3 and 4 are optional/review
    };

    return (
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        {/* Back Button */}
        {currentStep > 1 && !showResults && (
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {currentStep === 1 && <div></div>}

        {/* Next Button */}
        {currentStep < 4 && !showResults && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ml-auto ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  // Step 1: Interests Selection
  const renderInterestsStep = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What are your interests?</h2>
          <p className="text-lg text-gray-600">Select the areas that excite you most. We'll use these to find the perfect courses.</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-900">Pro Tip:</span>
            <span className="text-blue-800 ml-2">
              Select 3-5 interests for the most accurate recommendations.
              {selectedInterests.length > 0 && (
                <span className="ml-2 font-semibold">({selectedInterests.length} selected)</span>
              )}
            </span>
          </div>
        </div>

        {/* Interest Categories */}
        <div className="space-y-8">
          {Object.entries(interestCategories).map(([key, category]) => (
            <div key={key} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {category.interests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium min-h-[44px] ${
                      selectedInterests.includes(interest)
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Validation Message */}
        {selectedInterests.length === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-sm text-yellow-800">
              Please select at least one interest to continue
            </p>
          </div>
        )}

        {renderNavigation()}
      </div>
    </div>
  );

  // Step 2: Goals & Priorities
  const renderGoalsStep = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What are your goals?</h2>
          <p className="text-lg text-gray-600">Help us understand what matters most to you in your academic journey.</p>
        </div>

        {/* Goals Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your Goals</h3>
          <p className="text-sm text-gray-600 mb-6">
            Choose all that apply.
            {selectedGoals.length > 0 && (
              <span className="ml-2 font-semibold text-blue-600">({selectedGoals.length} selected)</span>
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {goals.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium min-h-[44px] ${
                  selectedGoals.includes(goal)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Sliders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Set Your Priorities</h3>
          <p className="text-sm text-gray-600 mb-6">
            Adjust these sliders to fine-tune how we weigh different factors in our recommendations.
          </p>

          <div className="space-y-8">
            {/* Academic Excellence */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-base font-semibold text-gray-900">Academic Excellence</label>
                  <p className="text-sm text-gray-600">Focus on GPA and course ratings</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{priorities.academicExcellence}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priorities.academicExcellence}
                onChange={(e) => handlePriorityChange('academicExcellence', e.target.value)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                style={{
                  background: `linear-gradient(to right, #2563eb ${priorities.academicExcellence}%, #e5e7eb ${priorities.academicExcellence}%)`
                }}
              />
            </div>

            {/* Career Preparation */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-base font-semibold text-gray-900">Career Preparation</label>
                  <p className="text-sm text-gray-600">Practical skills and industry readiness</p>
                </div>
                <span className="text-2xl font-bold text-green-600">{priorities.careerPreparation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priorities.careerPreparation}
                onChange={(e) => handlePriorityChange('careerPreparation', e.target.value)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                style={{
                  background: `linear-gradient(to right, #16a34a ${priorities.careerPreparation}%, #e5e7eb ${priorities.careerPreparation}%)`
                }}
              />
            </div>

            {/* Work-Life Balance */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-base font-semibold text-gray-900">Work-Life Balance</label>
                  <p className="text-sm text-gray-600">Manageable workload and schedule flexibility</p>
                </div>
                <span className="text-2xl font-bold text-purple-600">{priorities.workLifeBalance}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priorities.workLifeBalance}
                onChange={(e) => handlePriorityChange('workLifeBalance', e.target.value)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                style={{
                  background: `linear-gradient(to right, #9333ea ${priorities.workLifeBalance}%, #e5e7eb ${priorities.workLifeBalance}%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {selectedGoals.length === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-sm text-yellow-800">
              Please select at least one goal to continue
            </p>
          </div>
        )}

        {renderNavigation()}
      </div>
    </div>
  );

  // Step 3: Constraints
  const renderConstraintsStep = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Any scheduling preferences?</h2>
          <p className="text-lg text-gray-600">
            These are optional filters to further refine your recommendations.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-900">Optional:</span>
            <span className="text-gray-700 ml-2">
              You can skip this step if you don't have specific constraints.
              {selectedConstraints.length > 0 && (
                <span className="ml-2 font-semibold">({selectedConstraints.length} selected)</span>
              )}
            </span>
          </div>
        </div>

        {/* Constraints List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-3">
            {constraints.map(constraint => (
              <label
                key={constraint}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 min-h-[44px] ${
                  selectedConstraints.includes(constraint)
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedConstraints.includes(constraint)}
                  onChange={() => toggleConstraint(constraint)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-0.5"
                />
                <span className={`ml-4 text-base font-medium ${
                  selectedConstraints.includes(constraint) ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {constraint}
                </span>
              </label>
            ))}
          </div>
        </div>

        {renderNavigation()}
      </div>
    </div>
  );

  // Step 4: Review & Generate
  const renderReviewStep = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Review Your Selections</h2>
          <p className="text-lg text-gray-600">
            Make sure everything looks good before we generate your personalized recommendations.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="space-y-6 mb-8">
          {/* Interests Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Selected Interests</h3>
                  <p className="text-sm text-gray-600">{selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <button
                onClick={() => navigateToStep(1)}
                className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 font-medium transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(interest => (
                <span key={interest} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Goals Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Goals & Priorities</h3>
                  <p className="text-sm text-gray-600">{selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <button
                onClick={() => navigateToStep(2)}
                className="px-4 py-2 rounded-lg text-green-600 hover:bg-green-50 font-medium transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedGoals.map(goal => (
                  <span key={goal} className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    {goal}
                  </span>
                ))}
              </div>

              {/* Priority Bars */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-40">Academic Excellence</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${priorities.academicExcellence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{priorities.academicExcellence}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-40">Career Preparation</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${priorities.careerPreparation}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{priorities.careerPreparation}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-40">Work-Life Balance</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${priorities.workLifeBalance}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{priorities.workLifeBalance}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Constraints Summary */}
          {selectedConstraints.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Constraints</h3>
                    <p className="text-sm text-gray-600">{selectedConstraints.length} constraint{selectedConstraints.length !== 1 ? 's' : ''} applied</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateToStep(3)}
                  className="px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50 font-medium transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedConstraints.map(constraint => (
                  <span key={constraint} className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                    {constraint}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to discover your perfect courses?</h3>
          <p className="text-blue-100 mb-6">
            Our AI will analyze your preferences and generate personalized recommendations
          </p>
          <button
            onClick={generateRecommendations}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-bold hover:bg-blue-50 transition-all shadow-md hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-6 h-6" />
            Generate AI Recommendations
          </button>
        </div>

        {/* Back Button Only */}
        <div className="flex justify-start mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Container with max-width and padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-smu-blue mb-2">
            AI Course Recommender
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Get personalized course suggestions powered by artificial intelligence
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Progress Indicator */}
            {renderProgressIndicator()}

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {currentStep === 1 && renderInterestsStep()}
              {currentStep === 2 && renderGoalsStep()}
              {currentStep === 3 && renderConstraintsStep()}
              {currentStep === 4 && renderReviewStep()}
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">Your Personalized Recommendations</h2>
                  <p className="text-blue-100 text-lg">
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
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-md"
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
                    <div key={course.id} className="bg-white rounded-xl shadow-md border-2 border-purple-200 p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${confidence.bg} ${confidence.color}`}>
                              {confidence.level} Match
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-blue-600 mb-1">{course.id}</h3>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.professor}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Match Score</span>
                          <span className="text-xl font-bold text-purple-600">{Math.round(score)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                            style={{ width: `${Math.min(score, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Why this course?</h4>
                        <ul className="space-y-2">
                          {reasons.slice(0, 4).map((reason, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Rating</p>
                          <p className="font-bold text-gray-900">{course.afterClassRating}/5.0</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Difficulty</p>
                          <p className="font-bold text-gray-900">{course.difficulty}/5</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Demand</p>
                          <p className="font-bold text-gray-900">{course.demand}</p>
                        </div>
                      </div>

                      {isInCart ? (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                          <span className="text-sm text-green-700 font-semibold flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Already in Cart
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(course.id)}
                          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-yellow-200 p-8 text-center">
                <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Recommendations Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find courses matching your criteria. Try adjusting your selections.
                </p>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AIRecommender;
