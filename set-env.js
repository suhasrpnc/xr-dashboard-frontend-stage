const fs = require('fs');
const dotenv = require('dotenv');

// Usage: node set-env.js [local|production|chrp]
// Default: local
const mode = (process.argv[2] || 'local').toLowerCase();

let apiUrl;
let isProduction = false;
if (mode === 'production') {
  apiUrl = 'API_URL_PRODUCTION';
  isProduction = true;
} else if (mode === 'chrp') {
  apiUrl = 'API_URL_CHRP';
  isProduction = true; // CHRP also sets production true
} else {
  apiUrl = 'API_URL_LOCAL';
}

// Load .env file
const result = dotenv.config();

if (result.error) {
  console.error('❌ Failed to load .env. Ensure the file exists at project root.');
  process.exit(1);
}

const env = result.parsed;
const targetPath = './public/config/environment.ts';

// Compose environment file string
const envFileContent = `
export const environment = {
  production: ${isProduction},
  apiUrl: '${env[apiUrl]}',
  appVersion: '${env.APP_VERSION}'
};
`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`✅ Environment file generated successfully for '${mode}' at`, targetPath);