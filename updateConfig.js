const fs = require('fs');

// Read paths from paths.json
const paths = JSON.parse(fs.readFileSync('paths.json', 'utf8'));

// Function to update config files
function updateConfig(file) {
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  // Ensure paths are correctly assigned
  config.compilerOptions.paths = { ...config.compilerOptions.paths, ...paths };
  
  fs.writeFileSync(file, JSON.stringify(config, null, 2));
}

// Update tsconfig.json and jsconfig.json
updateConfig('tsconfig.json');