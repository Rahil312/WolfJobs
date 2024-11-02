const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const autoOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, 
  },

}, {
  timestamps: true
});

async function sendVerificationEmail(email, otp) {
  try {
    console.log("Attempting to send email to:", email);
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
autoOtpSchema.pre("save", async function (next) {
  console.log("Pre-save hook triggered for new OTP document");
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model("OTP", autoOtpSchema);
