import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourceDir = path.join(projectRoot, 'public');
const targetDir = path.join(projectRoot, 'public', 'optimized');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// List of images to optimize
const images = [
  {
    filename: 'howitworks.png',
    maxWidth: 1200, // Responsive but not too large
  },
  {
    filename: 'whyitworks.png',
    maxWidth: 1200, // Responsive but not too large
  },
  {
    filename: 'empath-logo.png',
    maxWidth: 96, // Logo can be smaller
  }
];

// Process each image
async function processImages() {
  for (const image of images) {
    const sourcePath = path.join(sourceDir, image.filename);
    const targetPath = path.join(targetDir, image.filename.replace(/\.\w+$/, '.webp'));
    
    console.log(`Processing ${image.filename}...`);
    
    try {
      // Convert and optimize image
      await sharp(sourcePath)
        .resize({ width: image.maxWidth, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(targetPath);
      
      console.log(`Converted ${image.filename} to ${path.basename(targetPath)}`);
    } catch (error) {
      console.error(`Error processing ${image.filename}:`, error);
    }
  }
}

processImages().then(() => {
  console.log('Image optimization complete!');
}).catch(err => {
  console.error('Error optimizing images:', err);
}); 