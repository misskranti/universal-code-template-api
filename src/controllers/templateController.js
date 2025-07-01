const TemplateGenerator = require('../services/templateGenerator');

class TemplateController {
  static async generateTemplate(req, res) {
    try {
      const { question_id, title, description, signature, language } = req.body;
      
      // Generate template based on language
      let template;
      switch (language) {
        case 'java':
          template = TemplateGenerator.generateJavaTemplate(signature, question_id, title, description);
          break;
        case 'python':
          template = TemplateGenerator.generatePythonTemplate(signature, question_id, title, description);
          break;
        case 'cpp':
          template = TemplateGenerator.generateCppTemplate(signature, question_id, title, description);
          break;
        case 'javascript':
          template = TemplateGenerator.generateJavaScriptTemplate(signature, question_id, title, description);
          break;
        default:
          return res.status(400).json({
            error: 'Unsupported language',
            details: `Language '${language}' is not supported`
          });
      }
      
      res.status(201).json({
        language,
        template
      });
      
    } catch (error) {
      console.error('Error generating template:', error);
      res.status(500).json({
        error: 'Internal server error',
        details: 'Failed to generate code template'
      });
    }
  }

  static async healthCheck(req, res) {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString() 
    });
  }
}

module.exports = TemplateController;