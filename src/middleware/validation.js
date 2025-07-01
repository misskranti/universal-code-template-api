const { body, validationResult } = require('express-validator');
const TYPE_MAPPINGS = require('../config/typeMappings');

// Validation rules for template request
const validateTemplateRequest = [
  body('question_id').isString().notEmpty().withMessage('question_id must be a non-empty string'),
  body('title').isString().notEmpty().withMessage('title must be a non-empty string'),
  body('description').isString().notEmpty().withMessage('description must be a non-empty string'),
  body('language').isIn(['java', 'python', 'cpp', 'javascript']).withMessage('language must be one of: java, python, cpp, javascript'),
  body('signature.function_name').isString().notEmpty().withMessage('signature.function_name must be a non-empty string'),
  body('signature.parameters').isArray().withMessage('signature.parameters must be an array'),
  body('signature.parameters.*.name').isString().notEmpty().withMessage('Each parameter must have a non-empty name'),
  body('signature.parameters.*.type').isString().notEmpty().withMessage('Each parameter must have a non-empty type'),
  body('signature.returns.type').optional().isString().withMessage('signature.returns.type must be a string if provided'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Custom validation for type mappings
const validateTypeMappings = (req, res, next) => {
  const { signature, language } = req.body;
  
  // Validate types exist in mappings
  const typeMapping = TYPE_MAPPINGS[language];
  if (!typeMapping) {
    return res.status(400).json({
      error: 'Unsupported language',
      details: `Language '${language}' is not supported`
    });
  }
  
  // Validate parameter types
  for (const param of signature.parameters) {
    if (!typeMapping[param.type] && !param.type.startsWith('List<') && !param.type.startsWith('Tree<')) {
      return res.status(400).json({
        error: 'Invalid parameter type',
        details: `Type '${param.type}' is not supported for language '${language}'`
      });
    }
  }
  
  // Validate return type if provided
  if (signature.returns && signature.returns.type) {
    if (!typeMapping[signature.returns.type] && !signature.returns.type.startsWith('List<') && !signature.returns.type.startsWith('Tree<')) {
      return res.status(400).json({
        error: 'Invalid return type',
        details: `Return type '${signature.returns.type}' is not supported for language '${language}'`
      });
    }
  }
  
  next();
};

module.exports = {
  validateTemplateRequest,
  handleValidationErrors,
  validateTypeMappings
};