const express = require('express');
const TemplateController = require('../controllers/templateController');
const { 
  validateTemplateRequest, 
  handleValidationErrors, 
  validateTypeMappings 
} = require('../middleware/validation');

const router = express.Router();

// Template generation endpoint
router.post('/template', 
  validateTemplateRequest,
  handleValidationErrors,
  validateTypeMappings,
  TemplateController.generateTemplate
);

// Health check endpoint
router.get('/health', TemplateController.healthCheck);

module.exports = router;