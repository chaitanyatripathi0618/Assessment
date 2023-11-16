const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '266000175007-lu957q8stbvg2r6ac24l9v53esoe3p5d.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost:3000/oauth2callback';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorization URL:', authUrl);
