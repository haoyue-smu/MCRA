import { useState, useEffect } from 'react';
import {
  Search, Filter, Star, TrendingUp, CheckCircle, XCircle,
  ShoppingCart, BookOpen, Users, Bell, BellOff, AlertCircle,
  Heart, Eye, TrendingDown, ArrowUp, Flame
} from 'lucide-react';
import { courses } from '../data/mockData';

function CourseBrowser({ cart, addToCart, removeFromCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDemand, setFilterDemand] = useState('all');
  const [filterSU, setFilterSU] = useState('all');
  const [filterProfessor, setFilterProfessor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('courseSubscriptions');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('courseWishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewedCourses');
    return saved ? JSON.parse(saved) : [];
  });

  // Track real-time subscriber counts
  const [subscriberCounts, setSubscriberCounts] = useState(() => {
    const saved = localStorage.getItem('subscriberCounts');
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with course data
    const initialCounts = {};
    courses.forEach(course => {
      initialCounts[course.id] = course.subscribers;
    });
    return initialCounts;
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDemand = filterDemand === 'all' || course.demand === filterDemand;
    const matchesSU = filterSU === 'all' ||
                     (filterSU === 'eligible' && course.suEligible) ||
                     (filterSU === 'not-eligible' && !course.suEligible);
    const matchesProfessor = !filterProfessor ||
                            course.professor.toLowerCase().includes(filterProfessor.toLowerCase());

    return matchesSearch && matchesDemand && matchesSU && matchesProfessor;
  });

  const isInCart = (courseId) => cart.some(c => c.id === courseId);

  const isSubscribed = (courseId) => subscriptions.includes(courseId);

  const toggleSubscription = (courseId) => {
    const isCurrentlySubscribed = isSubscribed(courseId);
    const newSubscriptions = isCurrentlySubscribed
      ? subscriptions.filter(id => id !== courseId)
      : [...subscriptions, courseId];

    setSubscriptions(newSubscriptions);
    localStorage.setItem('courseSubscriptions', JSON.stringify(newSubscriptions));

    // Update subscriber count in real-time
    const newCounts = {
      ...subscriberCounts,
      [courseId]: isCurrentlySubscribed
        ? subscriberCounts[courseId] - 1
        : subscriberCounts[courseId] + 1
    };
    setSubscriberCounts(newCounts);
    localStorage.setItem('subscriberCounts', JSON.stringify(newCounts));
  };

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getDemandEmoji = (demand) => {
    // Simplified: only show fire emoji for Very High demand to reduce visual noise
    if (demand === 'Very High') return '🔥';
    return null;
  };

  const getPredictedBid = (course) => {
    // Calculate predicted bid based on demand and historical data
    const baseBid = course.yearlyAverage;
    const subscriberRatio = subscriberCounts[course.id] / course.capacity;

    if (subscriberRatio > 1.8) {
      return `e$ ${Math.round(baseBid * 1.15)}-${Math.round(baseBid * 1.25)}`;
    } else if (subscriberRatio > 1.4) {
      return `e$ ${Math.round(baseBid * 1.05)}-${Math.round(baseBid * 1.15)}`;
    } else if (subscriberRatio > 1.0) {
      return `e$ ${baseBid}-${Math.round(baseBid * 1.10)}`;
    } else {
      return `e$ ${Math.round(baseBid * 0.9)}-${baseBid}`;
    }
  };

  const getSubscriberTrend = (courseId) => {
    // Simulate weekly trend (in a real app, this would come from backend)
    const baseSubscribers = courses.find(c => c.id === courseId)?.subscribers || 0;
    const currentSubscribers = subscriberCounts[courseId];
    const change = currentSubscribers - baseSubscribers;
    return change;
  };

  const isInWishlist = (courseId) => wishlist.includes(courseId);

  const toggleWishlist = (courseId) => {
    const newWishlist = isInWishlist(courseId)
      ? wishlist.filter(id => id !== courseId)
      : [...wishlist, courseId];

    setWishlist(newWishlist);
    localStorage.setItem('courseWishlist', JSON.stringify(newWishlist));
  };

  const addToRecentlyViewed = (course) => {
    const filtered = recentlyViewed.filter(c => c.id !== course.id);
    const updated = [course, ...filtered].slice(0, 5); // Keep only 5 most recent
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewedCourses', JSON.stringify(updated));
  };

  const checkScheduleClash = (course) => {
    const clashes = [];
    cart.forEach(cartCourse => {
      // Don't check for clash with itself
      if (cartCourse.id === course.id) return;

      course.schedule.forEach(schedule1 => {
        cartCourse.schedule.forEach(schedule2 => {
          if (schedule1.day === schedule2.day && schedule1.time === schedule2.time) {
            clashes.push({
              day: schedule1.day,
              time: schedule1.time,
              conflictWith: cartCourse.id
            });
          }
        });
      });
    });
    return clashes;
  };

  const getBiddingSuccessRate = (course) => {
    // Simulate success rate based on bid amount
    // In a real app, this would come from historical data
    const avgBid = course.yearlyAverage;
    return {
      low: Math.max(30, Math.min(50, 100 - (subscriberCounts[course.id] / course.capacity) * 50)),
      medium: Math.max(60, Math.min(85, 100 - (subscriberCounts[course.id] / course.capacity) * 30)),
      high: Math.max(90, Math.min(98, 100 - (subscriberCounts[course.id] / course.capacity) * 10)),
      avgBid: avgBid
    };
  };

  const renderDifficultyStars = (difficulty) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`${i < difficulty ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const getInterestLevel = (course) => {
    const ratio = (subscriberCounts[course.id] / course.capacity) * 100;
    const isInterested = isSubscribed(course.id);

    if (ratio > 150) {
      // Extreme competition
      return {
        bgColor: isInterested ? 'bg-red-500 hover:bg-red-600' : 'bg-red-100 hover:bg-red-200',
        textColor: isInterested ? 'text-white' : 'text-red-700',
        icon: '❤️',
        showFire: true
      };
    } else if (ratio > 120) {
      // High competition
      return {
        bgColor: isInterested ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-100 hover:bg-orange-200',
        textColor: isInterested ? 'text-white' : 'text-orange-700',
        icon: '🧡',
        showFire: false
      };
    } else if (ratio > 80) {
      // Medium competition
      return {
        bgColor: isInterested ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-100 hover:bg-yellow-200',
        textColor: isInterested ? 'text-white' : 'text-yellow-700',
        icon: '💛',
        showFire: false
      };
    } else {
      // Low competition
      return {
        bgColor: isInterested ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200',
        textColor: isInterested ? 'text-white' : 'text-gray-700',
        icon: '🤍',
        showFire: false
      };
    }
  };

  const CourseCard = ({ course }) => {
    const scheduleClashes = checkScheduleClash(course);
    const successRate = getBiddingSuccessRate(course);
    const predictedBid = getPredictedBid(course);
    const demandEmoji = getDemandEmoji(course.demand);
    const interestLevel = getInterestLevel(course);

    return (
    <div
      className="course-card flex flex-col h-full"
      onClick={() => {
        setSelectedCourse(course);
        addToRecentlyViewed(course);
      }}
    >
      {/* Header: Course ID and S/U Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold text-smu-blue">{course.id}</h3>
          {demandEmoji && <span className="text-xl">{demandEmoji}</span>}
        </div>
        {course.suEligible ? (
          <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-md border-2 border-green-400">
            ✓ S/U Eligible
          </span>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
            Not S/U
          </span>
        )}
      </div>

      <h4 className="text-base font-semibold text-gray-900 mb-1">{course.name}</h4>
      <p className="text-sm text-gray-600 mb-3">{course.professor}</p>

      {/* PRIORITY 1: Bidding Information - Most Important (Light Blue) */}
      <div className="mb-3 p-4 bg-gradient-to-r from-blue-50 to-sky-100 rounded-lg border-2 border-blue-300">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs text-blue-600 font-medium mb-1">Average Bid</div>
            <div className="text-2xl font-bold text-blue-900">e$ {course.yearlyAverage}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-600 font-medium mb-1">Predicted Range</div>
            <div className="text-lg font-bold text-blue-900">{predictedBid}</div>
          </div>
        </div>
        <div className="text-xs text-blue-700 bg-white/50 rounded px-2 py-1">
          {Math.round(successRate.high)}% success rate @ e$ {Math.round(successRate.avgBid * 1.15)}+
        </div>
      </div>

      {/* PRIORITY 2: Schedule - Very Important */}
      <div className={`mb-3 p-3 rounded-lg ${scheduleClashes.length > 0 ? 'bg-red-50 border-2 border-red-400' : 'bg-gray-50 border border-gray-200'}`}>
        {course.schedule.map((s, i) => {
          const clash = scheduleClashes.find(c => c.day === s.day && c.time === s.time);
          return (
            <div key={i} className="flex items-center">
              {clash && <span className="text-red-600 font-bold mr-2 text-lg">⚠️</span>}
              <div className={clash ? 'text-red-700' : 'text-gray-900'}>
                <span className="font-bold text-base">{s.day} {s.time}</span>
                {clash && (
                  <span className="ml-2 text-sm font-semibold">
                    Clash with {clash.conflictWith}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Metadata Section with Fixed Height for Consistency */}
      <div className="flex-grow min-h-[180px] mb-3">
        {/* Stats Row - Clear Labels */}
        <div className="space-y-2 mb-3 text-sm">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1.5" />
            <span className="text-gray-600 text-xs mr-2">Rating:</span>
            <span className="font-semibold text-gray-900">{course.afterClassRating}/5.0</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 text-xs mr-2">Difficulty:</span>
            <div className="text-base leading-none mr-2">
              {renderDifficultyStars(course.difficulty)}
            </div>
            <span className="text-gray-500 text-xs">({course.difficulty}/5)</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 text-xs mr-2">Time Commitment:</span>
            <span className="font-semibold text-gray-900 text-sm">{course.weeklyHours}</span>
          </div>
        </div>

        {/* Course Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {course.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Assessment Summary with Percentages */}
        <div className="text-xs text-gray-600">
          {course.assessments
            .filter(a => !a.type.toLowerCase().includes('participation'))
            .map((a, idx) => {
              const displayType = a.type
                .replace(/Quiz \d+/, 'Quiz')
                .replace(/Lab Assignment/, 'Lab')
                .replace(/Group Project/, 'Project');
              return (
                <span key={idx}>
                  {idx > 0 && ' • '}
                  {displayType} {a.weight}%
                </span>
              );
            })}
        </div>
      </div>

      {/* Action Buttons - Always at Bottom */}
      <div className="flex items-center mt-auto gap-2">
        {isInCart(course.id) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(course.id);
            }}
            className="btn-danger flex-1 min-w-0 flex items-center justify-center"
          >
            <XCircle className="w-4 h-4 mr-2" />
            <span className="truncate">Remove</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(course.id);
            }}
            className="btn-primary flex-1 min-w-0 flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="truncate">Add to Cart</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSubscription(course.id);
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors flex-shrink-0 ${interestLevel.bgColor} ${interestLevel.textColor}`}
          title={isSubscribed(course.id) ? "Remove interest" : "Express interest"}
        >
          <span className="text-base">{interestLevel.icon}</span>
          <span className="font-semibold text-sm">{subscriberCounts[course.id]}</span>
          <span className="text-xs opacity-70">/{course.capacity}</span>
          {interestLevel.showFire && <span className="ml-0.5">🔥</span>}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCourse(course);
            addToRecentlyViewed(course);
          }}
          className="bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center p-2 rounded-md transition-colors flex-shrink-0"
          title="View details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
    );
  };

  return (
    <div className="w-full px-20 py-8">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Course Browser</h1>
        <p className="page-description">Browse courses with live demand transparency and S/U indicators</p>
      </div>

      {/* Info Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="alert-info">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">S/U Policy Reminder</h3>
              <p className="text-sm text-blue-800">
                You can S/U up to 12 CUs. Core modules and final semester courses cannot be S/U-ed.
                Courses marked with a green badge are S/U eligible.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start">
            <Heart className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">Interest Level Indicator</h3>
              <p className="text-sm text-orange-800 mb-2">
                Heart color shows competition level based on interest/capacity ratio:
              </p>
              <div className="space-y-1 text-xs text-gray-700">
                <div className="flex items-center">
                  <span className="mr-2">🤍</span>
                  <span>Low (&lt;80%) - Good availability</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">💛</span>
                  <span>Medium (80-120%) - Moderate competition</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🧡</span>
                  <span>High (120-150%) - High competition</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">❤️🔥</span>
                  <span>Extreme (&gt;150%) - Very high competition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, professors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center md:justify-start"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demand Level</label>
              <select
                value={filterDemand}
                onChange={(e) => setFilterDemand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              >
                <option value="all">All Levels</option>
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">S/U Eligibility</label>
              <select
                value={filterSU}
                onChange={(e) => setFilterSU(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              >
                <option value="all">All Courses</option>
                <option value="eligible">S/U Eligible Only</option>
                <option value="not-eligible">Not S/U Eligible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professor</label>
              <input
                type="text"
                placeholder="Filter by professor..."
                value={filterProfessor}
                onChange={(e) => setFilterProfessor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredCourses.length}</span> courses
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{cart.length} in cart</span>
        </div>
      </div>

      {/* Recently Viewed Courses */}
      {recentlyViewed.length > 0 && (
        <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-3">
            <Eye className="w-4 h-4 text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-900 text-sm">Recently Viewed</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentlyViewed.map((course) => (
              <button
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  addToRecentlyViewed(course);
                }}
                className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm flex items-center space-x-2"
              >
                <span className="font-semibold text-smu-blue">{course.id}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">{course.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-smu-blue mb-2">{selectedCourse.id} - {selectedCourse.name}</h2>
                  <p className="text-gray-600">{selectedCourse.professor}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedCourse.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Schedule</h3>
                  {selectedCourse.schedule.map((s, i) => (
                    <p key={i} className="text-gray-700">
                      {s.day}, {s.time} - {s.location}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Assessments & Deadlines</h3>
                  <div className="space-y-2">
                    {selectedCourse.assessments.map((a, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{a.type}</div>
                            {a.title && <div className="text-sm text-gray-600 mt-1">{a.title}</div>}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-smu-blue">{a.weight}%</div>
                            <div className="text-xs text-gray-600 mt-1">{new Date(a.date).toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bidding Information in Modal */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold mb-3">Bidding Information</h3>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-purple-700 font-semibold mb-1">Yearly Average</div>
                      <div className="text-2xl font-bold text-purple-900">e$ {selectedCourse.yearlyAverage}</div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-700 font-semibold mb-1">Bidding Range</div>
                      <div className="text-xl font-bold text-purple-900">{selectedCourse.bidRange}</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-700 font-semibold mb-2">Historical Trends (Past Year)</div>
                  <div className="space-y-1">
                    {selectedCourse.bidHistory.map((history, i) => (
                      <div key={i} className="flex justify-between text-sm bg-white p-2 rounded">
                        <span className="text-gray-700">{history.term}</span>
                        <span className="text-gray-600">
                          Min: <span className="font-semibold text-green-600">{history.minBid}</span> |
                          Avg: <span className="font-semibold text-blue-600"> {history.avgBid}</span> |
                          Max: <span className="font-semibold text-red-600"> {history.maxBid}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Career Paths</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.careerPaths.map((path, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {path}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Skills Gained</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBrowser;
