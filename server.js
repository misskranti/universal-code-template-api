const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Universal Code Template Generator API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
  console.log(`Template endpoint: POST http://localhost:${PORT}/api/v1/template`);
});