const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = '266000175007-lu957q8stbvg2r6ac24l9v53esoe3p5d.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'chaitanyatripathi0618@gmail.com', 
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: 'REFRESHTOKEN', 
    accessToken: 'ACCESSTOKEN', 
  },
});

async function handleAuthorizationCode(authorizationCode) {
  try {
    const { tokens } = await oauth2Client.getToken(authorizationCode);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({
      version: 'v1',
      auth: oauth2Client,
    });

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
    });

    const unreadEmails = res.data.messages;
    console.log('Unread emails:', unreadEmails);

    const sendReply = async (threadId) => {
      try {
        const mailOptions = {
          from: 'chaitanyatripathi0618@gmail.com',
          to: 'chiragt18dec@example.com',
          subject: 'OpenINApp',
          text: 'hi',
          threadId: threadId,
        };

        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error('Error sending reply:', error);
      }
    };

    const unrepliedThreads = ['THREAD_ID_1']; 

    for (const threadId of unrepliedThreads) {
      try {
        await sendReply(threadId);
        // Update record of replied threads after sending replies
      } catch (error) {
        console.error('Error sending reply:', error);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Simulating receiving the authorization code (replace this with actual handling)
const receivedAuthorizationCode = 'AUTHORIZATION_CODE'; 
handleAuthorizationCode(receivedAuthorizationCode);
