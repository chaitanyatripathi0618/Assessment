# Assessment
 Node.js based app that is able to respond to emails sent to your Gmail mailbox while you’re out on a vacation. 
here in this assessment i had used googleapis to fetch the google account and to get the data and nodemailer to send the mail.
 user: 'chaitanyatripathi0618@gmail.com', 
 receiver: 'chiragt18dec@gmail.com'.
 In this assessment i had used my google cloud account, where i had create a project named myMailApp.
 Through this assessment i can get the total unread messages as a thread and automatically it sends reply to the 1st threadid with "hi".
 
 const { google } = require('googleapis');--> this used to import the downloaded packages
const nodemailer = require('nodemailer');

const CLIENT_ID = '266000175007-lu957q8stbvg2r6ac24l9v53esoe3p5d.apps.googleusercontent.com'; ---> client id that i get while creating the project on google cloud
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
    accessToken: 'ACCESSTOKEN', -->accesstoken i can get when i am running this assessment after granting the authentication from my account i am getting the url which is used for one time purpose 
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
    console.log('Unread emails:', unreadEmails); --> this is showing all the unread messages as a thread id

    const sendReply = async (threadId) => { --> this function get active after all the authentication dones and this functions sends the emails to chiragt18dec@gmail.com id
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
const receivedAuthorizationCode = 'AUTHORIZATION_CODE'; -->after getting the access code i am using this access code here to run and sned the mail to the client.
handleAuthorizationCode(receivedAuthorizationCode);

and in file token.js i am using that file to get the token from the url and grant the access and run the node.js file with proper authentication code.

