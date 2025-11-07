import { useState } from 'react';
import { Brain, Sparkles, Target, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { courses } from '../data/mockData';

function AIRecommender({ cart, addToCart }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const interests = [
    'Web Development',
    'Data Science',
    'Cybersecurity',
    'Business Analysis',
    'Artificial Intelligence',
    'Database Management',
    'Mobile Development',
    'Cloud Computing'
  ];

  const goals = [
    'Graduate on time',
    'Maximize GPA',
    'Build practical skills',
    'Prepare for specific career',
    'Explore different fields',
    'Complete degree requirements',
    'Minimize workload',
    'Learn from best professors'
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

  const generateRecommendations = () => {
    // Simulated AI recommendations based on interests and goals
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

      if (selectedInterests.includes('Business Analysis') && course.id === 'IS210') {
        score += 30;
        reasons.push('Essential for Business Analysis');
      }

      if (selectedInterests.includes('Cybersecurity') && course.id === 'IS424') {
        score += 35;
        reasons.push('Core security course');
      }

      // Goal-based scoring
      if (selectedGoals.includes('Maximize GPA')) {
        if (course.difficulty === 'Medium' || course.workload === 'Medium') {
          score += 15;
          reasons.push('Manageable difficulty level');
        }
        if (course.afterClassRating >= 4.5) {
          score += 10;
          reasons.push('Highly rated by students');
        }
      }

      if (selectedGoals.includes('Build practical skills')) {
        if (course.id === 'IS216' || course.id === 'IS445' || course.assessments.some(a => a.type.includes('Project'))) {
          score += 20;
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
        if (course.workload === 'Medium' || course.workload === 'Low') {
          score += 20;
          reasons.push('Reasonable workload');
        }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Interests Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              What are your interests?
            </h2>
            <p className="text-sm text-gray-600 mb-4">Select all that apply:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedInterests.includes(interest)
                      ? 'bg-smu-blue text-white border-smu-blue'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-smu-blue'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              What are your goals?
            </h2>
            <p className="text-sm text-gray-600 mb-4">Select all that apply:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goals.map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium text-left ${
                    selectedGoals.includes(goal)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateRecommendations}
              disabled={selectedInterests.length === 0 && selectedGoals.length === 0}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center mx-auto ${
                selectedInterests.length === 0 && selectedGoals.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
              }`}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Generate AI Recommendations
            </button>
            {selectedInterests.length === 0 && selectedGoals.length === 0 && (
              <p className="text-sm text-gray-500 mt-3">Please select at least one interest or goal</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Results Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Personalized Recommendations</h2>
                <p className="text-purple-100">
                  Based on {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} and{' '}
                  {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setShowResults(false)}
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
                        <span className="text-lg font-bold text-purple-600">{score}%</span>
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
                        {reasons.map((reason, i) => (
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
                        <p className="text-gray-600">Workload</p>
                        <p className="font-semibold text-gray-900">{course.workload}</p>
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
                onClick={() => setShowResults(false)}
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
