import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load env from the current directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

console.log('--- Email Credential Verification Script ---');
console.log(`Loaded EMAIL_USER: "${email}"`);
console.log(`Loaded EMAIL_PASS length: ${pass ? pass.length : 0}`);

if (!email || !pass || email.includes('your-email')) {
    console.error('\n[ERROR] Credentials are missing or still set to placeholders.');
    console.error('Please edit server/.env with your actual Gmail address and App Password.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.trim(),
        pass: pass.trim()
    }
});

console.log('\nAttempting to connect to Gmail...');

transporter.verify((error, success) => {
    if (error) {
        console.error('\n[FAILED] Connection failed.');
        console.error('Error details:', error);
        console.log('\nTroubleshooting Tips:');
        console.log('1. Check if EMAIL_USER is exactly the account used to generate the App Password.');
        console.log('2. Ensure EMAIL_PASS is the 16-character App Password (not your login password).');
        console.log('3. Ensure 2-Step Verification is enabled on your Google Account.');
    } else {
        console.log('\n[SUCCESS] Connection verifiable! Your credentials are correct.');
        console.log('You can now restart your server and send emails.');
    }
});
