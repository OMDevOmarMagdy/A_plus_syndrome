// utils/sendMail.js
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error(
      "❌ Error sending email:",
      error.response?.body || error.message
    );
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;

// const nodemailer = require("nodemailer");

// const sendMail = async (to, subject, text, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_FROM,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"A+ Syndrome" <${process.env.EMAIL_FROM}>`,
//       to,
//       subject,
//       text,
//     });

//     console.log("✅ Email sent:", info.response);
//     return info;
//   } catch (err) {
//     console.error("❌ Error in sendmail:", err.message);
//     throw err;
//   }
// };

// module.exports = sendMail;
