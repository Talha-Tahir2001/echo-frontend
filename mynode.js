import { writeFile } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..'); // Move to the directory

// Load environment variables from .env
dotenv.config({ path: 'src/.env.prod' });

// Environment file content
const envFile = `export const environment = {
    PROD_BACKEND_URL: '${process.env.PROD_BACKEND_URL}',    
};
`;

// Define the target path
const targetPath = join(__dirname, './src/environments/environment.ts');

// Write the file
writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        const successColor = '\x1b[32m%s\x1b[0m';
        const checkSign = '\u{2705}';
        console.log(successColor, `${checkSign} Successfully generated environment.ts`);
    }
});