/**
 * Input validation and sanitization utilities
 */

import { EMAIL_DOMAIN, MIN_PASSWORD_LENGTH } from './constants';

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - Raw input string
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags and potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validate email address format and domain
 * @param {string} email - Email address to validate
 * @param {boolean} checkDomain - Whether to check for SMU domain
 * @returns {Object} Validation result with isValid and error message
 */
export const validateEmail = (email, checkDomain = true) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Check SMU domain if required
  if (checkDomain && !trimmedEmail.endsWith(EMAIL_DOMAIN)) {
    return { isValid: false, error: `Email must be from ${EMAIL_DOMAIN} domain` };
  }

  // Additional validation
  const [localPart, domain] = trimmedEmail.split('@');

  if (localPart.length > 64) {
    return { isValid: false, error: 'Email local part too long' };
  }

  if (domain.length > 255) {
    return { isValid: false, error: 'Email domain too long' };
  }

  return { isValid: true, error: null, email: trimmedEmail };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength score and feedback
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      strength: 0,
      feedback: ['Password is required']
    };
  }

  const feedback = [];
  let strength = 0;

  // Length check
  if (password.length < MIN_PASSWORD_LENGTH) {
    feedback.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  } else {
    strength += 25;
  }

  // Complexity checks
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

  // Additional length bonus
  if (password.length >= 12) strength += 15;

  // Feedback messages
  if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters');
  if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Add numbers');
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add special characters');

  return {
    isValid: strength >= 50 && password.length >= MIN_PASSWORD_LENGTH,
    strength: Math.min(strength, 100),
    feedback
  };
};

/**
 * Validate number input with min/max constraints
 * @param {*} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {Object} Validation result
 */
export const validateNumber = (value, min = -Infinity, max = Infinity) => {
  const num = Number(value);

  if (isNaN(num)) {
    return { isValid: false, error: 'Must be a valid number', value: null };
  }

  if (num < min) {
    return { isValid: false, error: `Must be at least ${min}`, value: null };
  }

  if (num > max) {
    return { isValid: false, error: `Must be at most ${max}`, value: null };
  }

  return { isValid: true, error: null, value: num };
};

/**
 * Validate integer input
 * @param {*} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {Object} Validation result
 */
export const validateInteger = (value, min = -Infinity, max = Infinity) => {
  const result = validateNumber(value, min, max);

  if (!result.isValid) {
    return result;
  }

  if (!Number.isInteger(result.value)) {
    return { isValid: false, error: 'Must be a whole number', value: null };
  }

  return result;
};

/**
 * Validate course code format (e.g., IS111, STAT151)
 * @param {string} code - Course code to validate
 * @returns {Object} Validation result
 */
export const validateCourseCode = (code) => {
  if (!code || typeof code !== 'string') {
    return { isValid: false, error: 'Course code is required' };
  }

  const trimmedCode = code.trim().toUpperCase();

  // Format: 2-4 letters followed by 3-4 digits
  const codeRegex = /^[A-Z]{2,4}\d{3,4}$/;

  if (!codeRegex.test(trimmedCode)) {
    return {
      isValid: false,
      error: 'Course code must be 2-4 letters followed by 3-4 digits (e.g., IS111)'
    };
  }

  return { isValid: true, error: null, code: trimmedCode };
};

/**
 * Validate search query
 * @param {string} query - Search query
 * @param {number} minLength - Minimum query length
 * @param {number} maxLength - Maximum query length
 * @returns {Object} Validation result
 */
export const validateSearchQuery = (query, minLength = 1, maxLength = 100) => {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Search query is required', query: '' };
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery.length < minLength) {
    return {
      isValid: false,
      error: `Search query must be at least ${minLength} characters`,
      query: ''
    };
  }

  if (trimmedQuery.length > maxLength) {
    return {
      isValid: false,
      error: `Search query must be at most ${maxLength} characters`,
      query: ''
    };
  }

  // Sanitize the query
  const sanitizedQuery = sanitizeString(trimmedQuery);

  return { isValid: true, error: null, query: sanitizedQuery };
};

/**
 * Validate array input
 * @param {*} value - Value to validate
 * @param {number} minLength - Minimum array length
 * @param {number} maxLength - Maximum array length
 * @returns {Object} Validation result
 */
export const validateArray = (value, minLength = 0, maxLength = Infinity) => {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Must be an array', value: null };
  }

  if (value.length < minLength) {
    return {
      isValid: false,
      error: `Must have at least ${minLength} items`,
      value: null
    };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `Must have at most ${maxLength} items`,
      value: null
    };
  }

  return { isValid: true, error: null, value };
};

/**
 * Validate date input
 * @param {*} value - Date value to validate
 * @param {Date} minDate - Minimum allowed date
 * @param {Date} maxDate - Maximum allowed date
 * @returns {Object} Validation result
 */
export const validateDate = (value, minDate = null, maxDate = null) => {
  let date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    date = new Date(value);
  } else {
    return { isValid: false, error: 'Invalid date format', value: null };
  }

  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date', value: null };
  }

  if (minDate && date < minDate) {
    return {
      isValid: false,
      error: `Date must be on or after ${minDate.toLocaleDateString()}`,
      value: null
    };
  }

  if (maxDate && date > maxDate) {
    return {
      isValid: false,
      error: `Date must be on or before ${maxDate.toLocaleDateString()}`,
      value: null
    };
  }

  return { isValid: true, error: null, value: date };
};

/**
 * Validate bid amount
 * @param {*} bidAmount - Bid amount to validate
 * @param {number} minBid - Minimum bid amount
 * @param {number} maxBid - Maximum bid amount
 * @returns {Object} Validation result
 */
export const validateBidAmount = (bidAmount, minBid = 10, maxBid = 200) => {
  const result = validateInteger(bidAmount, minBid, maxBid);

  if (!result.isValid) {
    return result;
  }

  // Bid should be a positive integer
  if (result.value <= 0) {
    return { isValid: false, error: 'Bid must be positive', value: null };
  }

  return result;
};

/**
 * Sanitize and validate form data object
 * @param {Object} formData - Form data object
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result with sanitized data and errors
 */
export const validateFormData = (formData, schema) => {
  const errors = {};
  const sanitizedData = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const value = formData[field];

    // Required check
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors[field] = `${field} is required`;
      isValid = false;
      continue;
    }

    // Skip validation if optional and empty
    if (!rules.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Type-specific validation
    let result;
    switch (rules.type) {
      case 'email':
        result = validateEmail(value, rules.checkDomain);
        break;
      case 'number':
        result = validateNumber(value, rules.min, rules.max);
        break;
      case 'integer':
        result = validateInteger(value, rules.min, rules.max);
        break;
      case 'string':
        result = { isValid: true, value: sanitizeString(value) };
        if (rules.minLength && result.value.length < rules.minLength) {
          result.isValid = false;
          result.error = `Minimum length is ${rules.minLength}`;
        }
        if (rules.maxLength && result.value.length > rules.maxLength) {
          result.isValid = false;
          result.error = `Maximum length is ${rules.maxLength}`;
        }
        break;
      case 'array':
        result = validateArray(value, rules.minLength, rules.maxLength);
        break;
      case 'date':
        result = validateDate(value, rules.minDate, rules.maxDate);
        break;
      default:
        result = { isValid: true, value };
    }

    if (!result.isValid) {
      errors[field] = result.error;
      isValid = false;
    } else {
      sanitizedData[field] = result.value;
    }

    // Custom validation function
    if (rules.validate && typeof rules.validate === 'function') {
      const customResult = rules.validate(result.value);
      if (!customResult.isValid) {
        errors[field] = customResult.error;
        isValid = false;
      }
    }
  }

  return { isValid, errors, data: sanitizedData };
};
