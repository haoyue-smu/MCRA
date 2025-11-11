/**
 * Shared utility functions for course management
 */

import { COURSE_COLORS } from './constants';

/**
 * Optimized time clash detection using Map-based approach (O(n) instead of O(n²))
 * @param {Array} courses - Array of course objects with schedule information
 * @returns {Array} Array of clash objects with details about conflicting courses
 */
export const detectTimeClashes = (courses) => {
  const clashes = [];
  const timeSlotMap = new Map();

  courses.forEach((course, courseIndex) => {
    if (!course.schedule || !Array.isArray(course.schedule)) {
      return;
    }

    course.schedule.forEach(slot => {
      const key = `${slot.day}-${slot.time}`;

      if (timeSlotMap.has(key)) {
        const existingCourses = timeSlotMap.get(key);
        existingCourses.forEach(existingCourse => {
          // Check if times actually overlap
          if (doTimesOverlap(slot, existingCourse.slot)) {
            clashes.push({
              course1: existingCourse.course,
              course2: course,
              day: slot.day,
              time: slot.time,
              slot1: existingCourse.slot,
              slot2: slot
            });
          }
        });
        timeSlotMap.get(key).push({ course, slot, courseIndex });
      } else {
        timeSlotMap.set(key, [{ course, slot, courseIndex }]);
      }
    });
  });

  return clashes;
};

/**
 * Check if two time slots overlap
 * @param {Object} slot1 - First time slot with start and end times
 * @param {Object} slot2 - Second time slot with start and end times
 * @returns {boolean} True if the time slots overlap
 */
export const doTimesOverlap = (slot1, slot2) => {
  if (slot1.day !== slot2.day) {
    return false;
  }

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const start1 = parseTime(slot1.start || slot1.time.split('-')[0]);
  const end1 = parseTime(slot1.end || slot1.time.split('-')[1]);
  const start2 = parseTime(slot2.start || slot2.time.split('-')[0]);
  const end2 = parseTime(slot2.end || slot2.time.split('-')[1]);

  return (start1 < end2 && end1 > start2);
};

/**
 * Check if prerequisites are met for a course
 * @param {Object} course - Course object with prerequisites array
 * @param {Array} completedCourses - Array of completed course IDs
 * @returns {Object} Object with isMet boolean and missing array
 */
export const checkPrerequisites = (course, completedCourses = []) => {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return { isMet: true, missing: [] };
  }

  const completedSet = new Set(completedCourses);
  const missing = course.prerequisites.filter(prereq => !completedSet.has(prereq));

  return {
    isMet: missing.length === 0,
    missing
  };
};

/**
 * Get all prerequisites recursively for a course
 * @param {Object} course - Course object
 * @param {Array} allCourses - Array of all available courses
 * @param {Set} visited - Set of visited course IDs to prevent circular dependencies
 * @returns {Array} Array of all prerequisite course objects
 */
export const getAllPrerequisites = (course, allCourses, visited = new Set()) => {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return [];
  }

  if (visited.has(course.id)) {
    console.warn(`Circular prerequisite detected for course ${course.id}`);
    return [];
  }

  visited.add(course.id);
  const prereqs = [];

  course.prerequisites.forEach(prereqId => {
    const prereqCourse = allCourses.find(c => c.id === prereqId);
    if (prereqCourse) {
      prereqs.push(prereqCourse);
      const nestedPrereqs = getAllPrerequisites(prereqCourse, allCourses, new Set(visited));
      prereqs.push(...nestedPrereqs);
    }
  });

  return prereqs;
};

/**
 * Get color for a course based on its index
 * @param {number} index - Index of the course
 * @returns {string} Tailwind CSS color class
 */
export const getCourseColor = (index) => {
  return COURSE_COLORS[index % COURSE_COLORS.length];
};

/**
 * Filter assessments by date range
 * @param {Array} courses - Array of courses with assessments
 * @param {Date} startDate - Start date for filtering
 * @param {Date} endDate - End date for filtering (optional)
 * @returns {Array} Array of assessment objects with course info
 */
export const filterAssessmentsByDateRange = (courses, startDate, endDate = null) => {
  const assessments = [];

  courses.forEach(course => {
    if (course.assessments && Array.isArray(course.assessments)) {
      course.assessments.forEach(assessment => {
        const assessmentDate = new Date(assessment.date);
        const isInRange = assessmentDate >= startDate &&
                         (!endDate || assessmentDate <= endDate);

        if (isInRange) {
          assessments.push({
            ...assessment,
            courseId: course.id,
            courseCode: course.code,
            courseName: course.name,
            courseColor: getCourseColor(courses.indexOf(course))
          });
        }
      });
    }
  });

  return assessments.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Calculate total credits for an array of courses
 * @param {Array} courses - Array of course objects
 * @returns {number} Total credit units
 */
export const calculateTotalCredits = (courses) => {
  if (!Array.isArray(courses)) {
    return 0;
  }
  return courses.reduce((total, course) => total + (course.credits || 0), 0);
};

/**
 * Group courses by type (core, elective, etc.)
 * @param {Array} courses - Array of course objects
 * @returns {Object} Object with courses grouped by type
 */
export const groupCoursesByType = (courses) => {
  const grouped = {
    core: [],
    elective: [],
    discipline: [],
    free: [],
    other: []
  };

  courses.forEach(course => {
    const type = course.type?.toLowerCase() || 'other';
    if (grouped[type]) {
      grouped[type].push(course);
    } else {
      grouped.other.push(course);
    }
  });

  return grouped;
};

/**
 * Check if a course has assessments within a specified number of days
 * @param {Object} course - Course object with assessments
 * @param {number} days - Number of days to check
 * @param {Date} referenceDate - Reference date (defaults to today)
 * @returns {boolean} True if course has assessments within the specified days
 */
export const hasUpcomingAssessments = (course, days = 7, referenceDate = new Date()) => {
  if (!course.assessments || course.assessments.length === 0) {
    return false;
  }

  const endDate = new Date(referenceDate);
  endDate.setDate(endDate.getDate() + days);

  return course.assessments.some(assessment => {
    const assessmentDate = new Date(assessment.date);
    return assessmentDate >= referenceDate && assessmentDate <= endDate;
  });
};

/**
 * Get predicted bid for a course based on subscriber ratio
 * @param {Object} course - Course object with bidHistory
 * @param {number} subscriberRatio - Ratio of subscribers to vacancies
 * @returns {number} Predicted bid amount
 */
export const getPredictedBid = (course, subscriberRatio) => {
  if (!course.bidHistory || course.bidHistory.length === 0) {
    return 0;
  }

  const latestBid = course.bidHistory[0];
  const avgBid = latestBid.avgBid || 0;

  // Adjust prediction based on subscriber ratio
  if (subscriberRatio > 1.8) {
    return Math.round(avgBid * 1.3);
  } else if (subscriberRatio > 1.4) {
    return Math.round(avgBid * 1.15);
  } else {
    return avgBid;
  }
};

/**
 * Validate course data structure
 * @param {Object} course - Course object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateCourse = (course) => {
  const errors = [];

  if (!course.id) errors.push('Course ID is required');
  if (!course.code) errors.push('Course code is required');
  if (!course.name) errors.push('Course name is required');
  if (typeof course.credits !== 'number' || course.credits <= 0) {
    errors.push('Valid credit value is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
