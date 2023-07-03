const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
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

    // Update the user's model with the confirmation code
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { 'confirmation.code': code } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found.');
    }

    const mailOptions = {
      from: 'your_email@example.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Confirmation Code', // Email subject
      text: `Your confirmation code is: ${code}`, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation code email sent:', info.messageId);
  } catch (error) {
    throw new Error('Error sending confirmation code email:', error);
  }
}

// Method to check confirmation code and set "confirmed" to true
async function confirmEmail(userId, code) {
    try {
        // Find the user in the database
        const user = await User.findById(userId);
    
        // Check if the user exists and the confirmation code matches
        if (user && code === user.confirmationCode) {
            // Update the user's "confirmed" field to true
            user.confirmed = true;
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
    confirmEmail
}