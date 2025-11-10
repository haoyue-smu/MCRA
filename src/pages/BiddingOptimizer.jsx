import { useState } from 'react';
import { TrendingUp, DollarSign, AlertCircle, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function BiddingOptimizer({ cart }) {
  const [biddingAmounts, setBiddingAmounts] = useState({});

  const totalEDollars = 1000; // Mock total e$ available

  const handleBidChange = (courseId, amount) => {
    setBiddingAmounts({
      ...biddingAmounts,
      [courseId]: parseInt(amount) || 0
    });
  };

  const getTotalBid = () => {
    return Object.values(biddingAmounts).reduce((sum, val) => sum + val, 0);
  };

  const getRemainingBudget = () => {
    return totalEDollars - getTotalBid();
  };

  const getRecommendedBid = (course) => {
    const history = course.bidHistory[0];
    if (!history) return 0;

    // Calculate recommended bid based on demand
    const demandMultiplier = {
      'Very High': 1.2,
      'High': 1.0,
      'Medium': 0.8,
      'Low': 0.6
    };

    const multiplier = demandMultiplier[course.demand] || 1.0;
    return Math.round(history.avgBid * multiplier);
  };

  const getSuccessProbability = (course, bidAmount) => {
    const history = course.bidHistory[0];
    if (!history || !bidAmount) return 0;

    if (bidAmount >= history.maxBid) return 95;
    if (bidAmount >= history.avgBid) return 70;
    if (bidAmount >= history.minBid) return 40;
    return 15;
  };

  const prepareBidHistoryChart = (course) => {
    return course.bidHistory.map(h => ({
      term: h.term.split(' ')[1],
      'Min Bid': h.minBid,
      'Avg Bid': h.avgBid,
      'Max Bid': h.maxBid
    }));
  };

  return (
    <div className="w-full px-10 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-smu-blue mb-2">Bidding Optimizer</h1>
        <p className="text-gray-600">Smart bidding insights with predictive analytics</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-smu-blue">e$ {totalEDollars}</p>
            </div>
            <DollarSign className="w-12 h-12 text-smu-gold" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Allocated</p>
              <p className="text-3xl font-bold text-purple-600">e$ {getTotalBid()}</p>
            </div>
            <Target className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className={`text-3xl font-bold ${getRemainingBudget() < 0 ? 'text-red-600' : 'text-green-600'}`}>
                e$ {getRemainingBudget()}
              </p>
            </div>
            <TrendingUp className={`w-12 h-12 ${getRemainingBudget() < 0 ? 'text-red-500' : 'text-green-500'}`} />
          </div>
        </div>
      </div>

      {/* Budget Warning */}
      {getRemainingBudget() < 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Budget Exceeded</h3>
              <p className="text-sm text-red-800">
                You have allocated more e$ than available. Please adjust your bids.
              </p>
            </div>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">No Courses in Cart</h3>
              <p className="text-sm text-yellow-800">
                Add courses to your cart to start optimizing your bids.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(course => {
            const recommendedBid = getRecommendedBid(course);
            const currentBid = biddingAmounts[course.id] || 0;
            const successProb = getSuccessProbability(course, currentBid);
            const chartData = prepareBidHistoryChart(course);

            return (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-smu-blue">{course.id} - {course.name}</h3>
                      <p className="text-sm text-gray-600">{course.professor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                      course.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {course.demand} Demand
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Current Interest: {course.demandCount} students / {course.capacity} capacity
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Bidding Input and Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Your Bid (e$)</label>
                        <button
                          onClick={() => handleBidChange(course.id, recommendedBid)}
                          className="text-xs bg-smu-gold text-smu-blue px-2 py-1 rounded hover:bg-yellow-600 flex items-center"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Use Recommended
                        </button>
                      </div>
                      <input
                        type="number"
                        value={currentBid || ''}
                        onChange={(e) => handleBidChange(course.id, e.target.value)}
                        placeholder="Enter bid amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Success Probability</span>
                        <span className={`text-2xl font-bold ${
                          successProb >= 70 ? 'text-green-600' :
                          successProb >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {successProb}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            successProb >= 70 ? 'bg-green-600' :
                            successProb >= 40 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${successProb}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Recommended Bid</p>
                        <p className="text-lg font-bold text-smu-blue">e$ {recommendedBid}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Avg Bid (Last Term)</p>
                        <p className="text-lg font-bold text-gray-900">
                          e$ {course.bidHistory[0]?.avgBid || 0}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Min Bid (Last Term)</p>
                        <p className="text-lg font-bold text-green-600">
                          e$ {course.bidHistory[0]?.minBid || 0}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Max Bid (Last Term)</p>
                        <p className="text-lg font-bold text-red-600">
                          e$ {course.bidHistory[0]?.maxBid || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Historical Chart */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Historical Bidding Trends</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="term" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Min Bid" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="Avg Bid" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="Max Bid" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Insights */}
      {cart.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-6">
          <div className="flex items-start">
            <Zap className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Bidding Strategy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Prioritize high-demand courses with limited capacity first</li>
                <li>• Consider bidding slightly above average for courses with Very High demand</li>
                <li>• Save e$ on Medium/Low demand courses by bidding near minimum</li>
                <li>• Monitor live demand changes and adjust your strategy accordingly</li>
                <li>• Keep a buffer of 100-150 e$ for emergency adjustments in later rounds</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BiddingOptimizer;
