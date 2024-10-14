const fs = require('fs');
const path = require('path');

const targetDir = './'; // Change this if needed to your project folder
const outputFilePath = './folder-structure.txt';

function getFolderStructure(dir, prefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (file === 'node_modules' || file === '.git') {
      return; // Skip these directories
    }

    if (stat.isDirectory()) {
      fs.appendFileSync(outputFilePath, `${prefix}${file}/\n`);
      getFolderStructure(filePath, `${prefix}    `); // Recursively handle subfolders
    } else {
      fs.appendFileSync(outputFilePath, `${prefix}${file}\n`);
    }
  });
}

// Clear the file first
fs.writeFileSync(outputFilePath, 'Project Folder Structure\n\n');
getFolderStructure(targetDir);

console.log(`Folder structure saved to ${outputFilePath}`);
