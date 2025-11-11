/**
 * Safe localStorage utility functions with error handling
 */

import { STORAGE_KEYS } from './constants';

/**
 * Safely get item from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if retrieval fails
 * @returns {*} Parsed value or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} True if successful, false otherwise
 */
export const setToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Consider clearing old data.');
    } else {
      console.error(`Error writing to localStorage (key: ${key}):`, error);
    }
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if successful, false otherwise
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
};

/**
 * Clear all localStorage data
 * @returns {boolean} True if successful, false otherwise
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get user from storage
 * @returns {Object|null} User object or null
 */
export const getUser = () => {
  return getFromStorage(STORAGE_KEYS.USER, null);
};

/**
 * Save user to storage
 * @param {Object} user - User object
 * @returns {boolean} Success status
 */
export const saveUser = (user) => {
  return setToStorage(STORAGE_KEYS.USER, user);
};

/**
 * Remove user from storage (logout)
 * @returns {boolean} Success status
 */
export const removeUser = () => {
  return removeFromStorage(STORAGE_KEYS.USER);
};

/**
 * Get cart from storage
 * @returns {Array} Array of courses in cart
 */
export const getCart = () => {
  return getFromStorage(STORAGE_KEYS.CART, []);
};

/**
 * Save cart to storage
 * @param {Array} cart - Array of courses
 * @returns {boolean} Success status
 */
export const saveCart = (cart) => {
  return setToStorage(STORAGE_KEYS.CART, cart);
};

/**
 * Get wishlist from storage
 * @returns {Array} Array of course IDs in wishlist
 */
export const getWishlist = () => {
  return getFromStorage(STORAGE_KEYS.WISHLIST, []);
};

/**
 * Save wishlist to storage
 * @param {Array} wishlist - Array of course IDs
 * @returns {boolean} Success status
 */
export const saveWishlist = (wishlist) => {
  return setToStorage(STORAGE_KEYS.WISHLIST, wishlist);
};

/**
 * Get course ratings from storage
 * @returns {Object} Object with courseId as key and rating as value
 */
export const getCourseRatings = () => {
  return getFromStorage(STORAGE_KEYS.COURSE_RATINGS, {});
};

/**
 * Save course ratings to storage
 * @param {Object} ratings - Ratings object
 * @returns {boolean} Success status
 */
export const saveCourseRatings = (ratings) => {
  return setToStorage(STORAGE_KEYS.COURSE_RATINGS, ratings);
};

/**
 * Get completed courses from storage
 * @returns {Array} Array of completed course IDs
 */
export const getCompletedCourses = () => {
  return getFromStorage(STORAGE_KEYS.COMPLETED_COURSES, ['IS111', 'IS112', 'STAT151']);
};

/**
 * Save completed courses to storage
 * @param {Array} courses - Array of course IDs
 * @returns {boolean} Success status
 */
export const saveCompletedCourses = (courses) => {
  return setToStorage(STORAGE_KEYS.COMPLETED_COURSES, courses);
};

/**
 * Get sidebar collapsed state
 * @returns {boolean} True if sidebar is collapsed
 */
export const getSidebarCollapsed = () => {
  return getFromStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, false);
};

/**
 * Save sidebar collapsed state
 * @param {boolean} collapsed - Collapsed state
 * @returns {boolean} Success status
 */
export const saveSidebarCollapsed = (collapsed) => {
  return setToStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed);
};

/**
 * Get storage usage information
 * @returns {Object} Object with used and remaining space estimates
 */
export const getStorageInfo = () => {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }

    // Most browsers allow 5-10MB, we'll assume 5MB
    const maxSize = 5 * 1024 * 1024;
    const used = total * 2; // UTF-16 encoding (2 bytes per char)
    const remaining = maxSize - used;
    const percentUsed = (used / maxSize * 100).toFixed(2);

    return {
      used,
      remaining,
      percentUsed,
      maxSize
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};
