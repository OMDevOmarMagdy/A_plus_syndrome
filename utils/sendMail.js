const nodemailer = require("nodemailer");

const sendmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"A+ Syndrome" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendmail;
