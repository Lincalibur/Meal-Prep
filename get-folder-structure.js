const fs = require('fs');
const path = require('path');

const targetDir = './'; // Change this if needed to your project folder

function getFolderStructure(dir, prefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (file === 'node_modules' || file === '.git') {
      return; // Skip these directories
    }

    if (stat.isDirectory()) {
      console.log(`${prefix}${file}/`);
      getFolderStructure(filePath, `${prefix}    `); // Recursively handle subfolders
    } else {
      console.log(`${prefix}${file}`);
    }
  });
}

console.log('Project Folder Structure:\n');
getFolderStructure(targetDir);
