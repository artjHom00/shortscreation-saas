const nodemailer = require('nodemailer')
let User = require('../models/User')
let {
  generateAccessToken
} = require('../providers/jwt.js')


// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "support@shortscreation.tech", // generated ethereal user
    pass: "" // generated ethereal password
  }
  // Configuration for your email provider (e.g., Gmail, Outlook, etc.)
});

// Method to generate a random 6-digit code
function generateConfirmationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Method to send confirmation code to user's email
async function sendConfirmationCode(email) {
  try {
    const code = generateConfirmationCode();

    const mailOptions = {
      from: 'support@shortscreation.tech', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Confirmation Code', // Email subject
      text: `Your confirmation code is: ${code}`, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation code email sent:' + info.messageId);
    return code

  } catch (error) {
    throw new Error('Error sending confirmation code email:' + error);
  }
}

// Method to send confirmation code to user's email
async function sendRestorePasswordLink(email) {
  try {

    // Update the user's model with the confirmation code
    const user = await User.findOne({
      email
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const userWithJWT = await generateAccessToken(user)

    const restoreLink = process.env.HOST + '/change-password?token=' + userWithJWT.jwt_token

    const mailOptions = {
      from: 'support@shortscreation.tech', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Reset password link', // Email subject
      text: `We got a request from you to restore a password.
To proceed, go through link and change your password: ${restoreLink}`, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Restore password link email sent:' + info.messageId);
    return true

  } catch (error) {
    throw new Error('Error sending restore password link email:' + error);
  }
}

// Method to check confirmation code and set "confirmed" to true
async function confirmEmail(userId, code) {
  try {
    // Find the user in the database
    const user = await User.findById(userId);

    // Check if the user exists and the confirmation code matches
    if (user && code === user.confirmation.code.toString()) {
      // Update the user's "confirmed" field to true
      user.confirmation.status = true;
      await user.save();

      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error('Error confirming email:', error);
  }
}

module.exports = {
  sendConfirmationCode,
  sendRestorePasswordLink,
  confirmEmail
}